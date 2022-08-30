import './FixBtn.css'

import React from "react";
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';

import { __getAllTodos } from "../../redux/modules/todos";
import axios from 'axios';

function FixButton(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const deleteCheck = () =>{
        if(window.confirm('삭제할래요?')){
            axios.delete(`http://localhost:5001/todos/${props.id}`)
            .then(() => dispatch(__getAllTodos()));
            alert('삭제완료!');
        } else {
            alert('휴');
        }
    }
    
    if(props.type === 'delete'){
        return(
            <button className="iconBtn" onClick={deleteCheck}>
                <img 
                src={require('../../image/delete.png')}
                style={{'width':"20px","height":"20px"}}  alt="삭제버튼"/>
            </button>
        )
    }
    if(props.type === 'fix'){
        return(
            <button className="iconBtn"
                    onClick={() => navigate(`/edit/${props.id}`)}
            >
                <img  
                src={require('../../image/pencil.png')}
                style={{'width':"20px", "height":"20px"}}  alt="수정버튼"/>
            </button>
        )
    }

};
export default FixButton;
