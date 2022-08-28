import React from "react";
import Header from "../header/Header";
import HomePosts from "../homePosts/HomePosts";
import axios from "axios"
import { useState , useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {
  Button,

} from "@mui/material";


function Home() {
  const navigate = useNavigate();
  
  const [todoList, setTodoList] = useState([])

  
  useEffect(() => {
    let data = axios.get("http://localhost:5001/todos").then(response=>
    response['data'])
      console.log(data.then((result)=>{
        console.log(result)
        setTodoList(result)
      }))
  }, []);


  console.log(todoList)
  

  return (
    <>
      <Header />
        <div className="listTop">
          <h1>뭐할까용</h1>
          <Button variant="contained" onClick={() => navigate("/addPost")}>글쓰기</Button>
        </div>
        <div className="listBody">
          {todoList.map((v,index)=>(
              <HomePosts key={todoList[index].id} id={todoList[index].id} title={todoList[index].title} comment={todoList[index].comment} />    
            ))}
        </div>
    </>
  );
}

export default Home;
