import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../components/detail/Detail";
import Home from "../components/home/Home";
import Signup from "../components/signup/Signup";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 각자 작업한 router 설정 */}
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="detail/" element={<Detail />} />
                <Route path="detail/:id" element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
