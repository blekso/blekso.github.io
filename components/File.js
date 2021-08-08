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
export default function File({ file, onFileDelete, state }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function RenderFileObject() {
    const objectToRender = Object.assign({}, file);
    objectToRender.file_data = "...";
    return <pre>{JSON.stringify(objectToRender, null, 2)}</pre>;
  }

  function downloadFile() {
    console.log("downloading");
    console.log(file._id);
    console.log(state.user._id);
    axios({
      method: "get",
      url: "http://localhost:5000/api/files/download",
      data: {
        _id: file._id,
        ownerId: state.user._id,
      },
    })
      .then((res) => toast.success("Sucess"))
      .catch((err) => toast.error("Error"));
  }

  function deleteFile() {
    axios({
      method: "delete",
      url: "http://localhost:5000/api/files",
      data: {
        _id: file._id,
      },
    })
      .then((res) => toast.success("Sucess"), closeModal(), onFileDelete())
      .catch((err) => toast.error("Error"));
  }
  return (
    <div>
      <div
        onClick={openModal}
        className="flex flex-col justify-center items-center hover:bg-gray-100 p-4 cursor-pointer"
      >
        <img src="/svg/file.svg" alt={file.name} className="w-20 h-20" />
        <p>{file.name}</p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div className="flex justify-between">
            <p>{file.name}</p>
            <p onClick={closeModal} className="cursor-pointer">
              X
            </p>
          </div>
          <div className="p-2 bg-gray-100 mt-4">
            <RenderFileObject />
          </div>
          <div className="mt-4">
            <button
              onClick={downloadFile}
              className="bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-r mr-4"
            >
              Download
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-r"
              onClick={deleteFile}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
