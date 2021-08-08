import React from "react";
import axios from "axios";
import File from "./File";
import InputFile from "./InputFile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserDashboard({ state }) {
  const initialState = {
    files: [],
  };
  const [data, setData] = React.useState(initialState);

  function getData() {
    console.log("fetching data");
    axios({
      method: "get",
      url: "http://localhost:5000/api/files",
      params: {
        ownerId: state.user._id,
      },
    })
      .then((res) => {
        setData({
          ...data,
          files: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function refetchData() {
    setTimeout(function () {
      getData();
    }, 1000);
  }

  React.useEffect(() => {
    console.log("_id: " + state.user._id);
    getData();
  }, []);

  return (
    <div>
      <div className="grid md:grid-cols-6 grid-cols-2 gap-8 p-12">
        {data.files.map((file) => (
          <File
            key={file._id}
            state={state}
            file={file}
            onFileDelete={refetchData}
          />
        ))}
        <InputFile state={state} onFileDelete={refetchData} />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
