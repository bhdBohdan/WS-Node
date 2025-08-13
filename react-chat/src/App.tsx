// import { useEffect, useRef, useState } from "react";
// import CustomInput from "./components/Input";
// import { socket } from "./socket";
// import useMessages from "./hooks/useMessage";
// import type { MessageDTO } from "./models/models";
// import Message from "./components/Message";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/socketContext";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Chat from "./components/Chat";

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/general" element={<Layout />}>
            <Route index element={<Chat />} />
          </Route>
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
