import React from "react";
import { useNavigate} from "react-router-dom";
import useToken from "../../hooks/useToken";
import "./HomePosts.css";
import FixButton from "./FixBtn";


import { Link } from "react-router-dom";

function HomePosts(props) {
  const navigate = useNavigate();
  
  const token = useToken();
  
  
  if (token() === null) {
    return (
      <div className="postList">
        <div className="commentBox">
          <Link to={`/detail/${props.id}`}>
            <h3 className="title">{props.title}</h3>
            <p className="comment">{props.content}</p>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="postList">
        <div
          onClick={() => navigate(`/detail/${props.id}`)}
          className="commentBox"
        >
          <Link to={`/detail/${props.id}`}>
            <h3 className="title">{props.title}</h3>
            <p className="comment">{props.content}</p>
          </Link>
        </div>
        <span>
          <FixButton id={props.id} type={"delete"} />
          <FixButton id={props.id} type={"fix"} />
        </span>
      </div>
    );
  }
}

export default HomePosts;
