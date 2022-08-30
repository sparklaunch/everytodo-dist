import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../components/detail/Detail";
import Home from "../components/home/Home";
import Signup from "../components/signup/Signup";
import AddPost from "../components/addPost/AddPost";
import EditPost from "../components/edit/Edit";
import Login from "../components/login/Login";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 각자 작업한 router 설정 */}
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/addpost" element={<AddPost />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/edit" element={<EditPost />} />
                <Route path="/edit/:id" element={<EditPost />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
