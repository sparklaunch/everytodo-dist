import React from 'react'
import './AddPost.css'
import { useState } from 'react';
// import {useDispatch, useSelector} from 'react-redux'
import {
    Button,
    TextField
} from "@mui/material";

import {useNavigate} from 'react-router-dom';

import Home from '../home/Home';


function AddPost(){

    const [title, settitle] = useState('');
    const [comment, setcomment] = useState('');
    const [disabled, setdisabled] = useState(true);

    const inputValueChange = () =>{
        settitle(document.getElementById('post-title').value)
        setcomment(document.getElementById('post-comment').value)
        
        title.length < 9 || comment.length < 1 ? setdisabled(true) : setdisabled(false)
        // comment.length < 1 ? setdisabled(true) : setdisabled(false)
        console.log(title.length)
    }


    const AddPostBtn = (e) => {
        e.preventDefault()
        console.log('포스트 추가')
    }

    const navigate = useNavigate();

    return(
        <>
            <Home />
            
            <div className='add-post-box'>    
                <form className="add-post-form">
                    <div className='post-inputs'>
                        <div>
                            <label>제목</label>      
                            <TextField fullWidth label="10자 이상 작성해주세요!" id="post-title" onChange={inputValueChange}/>          
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