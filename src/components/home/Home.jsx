import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../header/Header";
import HomePosts from "../homePosts/HomePosts";
import axios from "axios";
import { Button } from "@mui/material";
import { __getAllTodos } from "../../redux/modules/todos";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../shared/Cookie";
import useToken from "../../hooks/useToken";

function Home() {
  // navigate
  const navigate = useNavigate();

  //get token
  const token = useToken();
  console.log("myid", token());

  // dispatch
  const dispatch = useDispatch();

  // useSeletor
  const { todos } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(__getAllTodos());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="listTop">
        <h1>뭐할까용</h1>
        <Button variant="contained" onClick={() => navigate("/addPost")}>
          글쓰기
        </Button>
      </div>
      <div className="listBody">
        {todos.map((item) => (
          <HomePosts
            key={item.id}
            id={item.id}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
