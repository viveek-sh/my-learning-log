import { useState } from "react";
import { Sender } from "./sender";
import { Receiver } from "./receiver";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sender" element={<Sender />} />
          <Route path="/receiver" element={<Receiver />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
const Landing = () => {
  const nav = useNavigate();
  return (
    <div>
      Move to Sender or Receiver Route <br /> &nbsp;
      <button onClick={() => nav("/sender")}>Sender </button>
      <button onClick={() => nav("/receiver")}>Reciver </button>
    </div>
  );
};

export default App;
