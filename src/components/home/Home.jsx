import React from "react";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Header from "../header/Header";
import HomePosts from "../homePosts/HomePosts";
import axios from "axios";
import { Button } from "@mui/material";
import { __getAllTodos } from "../../redux/modules/todos";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  // navigate
  const navigate = useNavigate();

  // const [todoList, setTodoList] = useState([])

  // useEffect(() => {
  //   let data = axios.get("http://localhost:5001/todos").then(response=>
  //   response['data'])
  //     console.log(data.then((result)=>{
  //       console.log(result)
  //       setTodoList(result)
  //     }))
  // }, []);

  // console.log(todoList)

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
            comment={item.comment}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
