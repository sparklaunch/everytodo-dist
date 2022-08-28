import React from "react";
import {useNavigate} from 'react-router-dom';

import "./HomePosts.css"
import FixButton from "./FixBtn";

// import axios from "axios"
import { useState , } from "react";




function HomePosts(props) {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate()

  console.log(props)

  if(login === true){
    return(
        <div className="postList">
            <div onClick={() => navigate("/detail:id")} className="commentBox">
                <h3 className="title">{props.title}</h3>
                <p className="comment">{props.comment}</p>
            </div>
        </div>
    );
  } else {
    return(
        <div className="postList">
            <div onClick={() => navigate("/detail:id")} className="commentBox">
                <h3 className="title">{props.title}</h3>
                <p className="comment">{props.comment}</p>
            </div>
            <span>
                <FixButton   type={'delete'} />
                <FixButton   type={'fix'} />
            </span>
        </div>
    )
  }

 
}

export default HomePosts;
