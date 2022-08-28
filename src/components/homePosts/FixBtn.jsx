import './FixBtn.css'

import React from "react";
import {useNavigate} from 'react-router-dom';


function FixButton(props) {
    const navigate = useNavigate()

    const deleteCheck = () =>{
        if(window.confirm('삭제할래요?')){
            alert('삭제!');
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
                    onClick={()=>navigate('/edit')}
            >
                <img  
                src={require('../../image/pencil.png')}
                style={{'width':"20px", "height":"20px"}}  alt="수정버튼"/>
            </button>
        )
    }

};
export default FixButton;
