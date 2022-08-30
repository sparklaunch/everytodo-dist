import './AddPost.css'
import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { __getAllTodos } from "../../redux/modules/todos";
import {
    Button,
    TextField
} from "@mui/material";

import HeaderStyle from "../../components/header/Header";

import axios from 'axios';

function AddPost(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, settitle] = useState('');
    const [comment, setcomment] = useState('');
    const [disabled, setdisabled] = useState(true);

    const inputValueChange = () =>{
        settitle(document.getElementById('post-title').value)
        setcomment(document.getElementById('post-comment').value)
        
        title.length < 4 || comment.length < 1 ? setdisabled(true) : setdisabled(false)
    }


    let data = {
        "title": title,
        "author": comment,
        "user_id": "user_id"
    }
    // let todoList = useSelector((state=>state )) 
    // const dispatch = useDispatch()
    const AddPostBtn = (e) => {
        e.preventDefault()
        console.log('포스트 추가')
        axios.post("http://localhost:5001/posts",data).then(response=>{
            dispatch(__getAllTodos())
        })
        navigate(-1)
    }


    return(
        <>
            <HeaderStyle />
            <div className='add-post-box'>    
                <form className="add-post-form">
                    <div className='post-inputs'>
                        <div>
                            <label>제목</label>      
                            <TextField fullWidth label="5자 이상 작성해주세요!" id="post-title" onChange={inputValueChange}/>          
                        </div>
                        <div>
                            <label>내용</label>                
                            <TextField fullWidth label="오늘은 뭘 해볼까요?" id="post-comment" onChange={inputValueChange}/>          
                        </div>
                    </div> 
                    <div className='post-btns'>
                        <Button variant="contained" onClick={() => navigate(-1)}>돌아가기</Button>
                        <Button variant="contained" disabled={disabled} onClick={AddPostBtn}>저장하기!!</Button>
                    </div>
                
                </form>
            </div>
        </>
    )
}

export default AddPost;