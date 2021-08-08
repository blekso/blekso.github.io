import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";

export default function Auth() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Login />
      <Register />
    </div>
  );
}
