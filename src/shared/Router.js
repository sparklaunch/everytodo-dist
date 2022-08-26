import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../components/detail/Detail";
import Home from "../components/home/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 각자 작업한 router 설정 */}
        <Route path="/" element={<Home />} />
        <Route path="detail/" element={<Detail />} />
        <Route path="detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
