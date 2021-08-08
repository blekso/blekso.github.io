import React from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    width: "26rem",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#app");
export default function InputFile({ state, onFileDelete }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState();
  const [isFilePicked, setIsFilePicked] = React.useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("File", selectedFile);
    formData.append("ownerId", state.user._id);
    fetch("http://localhost:5000/api/files", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        toast.success("Sucess");
        closeModal();
        onFileDelete();
      })
      .catch((error) => {
        toast.error("Error");
      });
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsFilePicked(false);
    setSelectedFile({});
    setIsOpen(false);
  }

  return (
    <div>
      <div
        onClick={openModal}
        className="flex h-full flex-col justify-center items-center hover:bg-gray-100 p-4 cursor-pointer"
      >
        <img src="/svg/plus.svg" alt="file" className="w-20 h-20 " />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div className="flex justify-between">
            <p>File upload</p>
            <p onClick={closeModal} className="cursor-pointer">
              X
            </p>
          </div>
          <div className="p-2 bg-gray-100 mt-4">
            {isFilePicked ? (
              <div>
                <p>"name": {selectedFile.name}</p>
                <p>"filetype": {selectedFile.type}</p>
                <p>"size": {selectedFile.size}</p>
                <p>
                  "date": {selectedFile.lastModifiedDate.toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p>Select a file to show details</p>
            )}
          </div>
          <label
            htmlFor="fileInput"
            className="flex flex-col justify-center items-center hover:bg-gray-100 p-4 cursor-pointer mt-4"
          >
            <p>Select File</p>
            <input
              className="hidden"
              id="fileInput"
              type="file"
              name="file"
              onChange={changeHandler}
            />
          </label>
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              disabled={!isFilePicked}
              onClick={handleSubmission}
              className="bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-r"
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-r"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
