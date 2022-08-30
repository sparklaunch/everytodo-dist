import React from "react";
import { useNavigate} from "react-router-dom";

import "./HomePosts.css";
import FixButton from "./FixBtn";

import { useState } from "react";
import { Link } from "react-router-dom";

function HomePosts(props) {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  if (login === true) {
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
