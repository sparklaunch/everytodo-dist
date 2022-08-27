import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@mui/icons-material/Create";
import {
  StyleInputComment,
  StyleAddComment,
  StyleCommentItem,
  CommentContainerStyle,
  ContainerStyle,
  TextStyle,
} from "./styles";

function CommentListComponent() {
  //   console.log("Comment Item", commentItem);
  return (
    <StyleCommentItem>
      <CommentContainerStyle direction="row" transePose="space-between">
        <CommentContainerStyle direction="column" margin="5px 0px 0px 10px">
          <TextStyle margin="7px 0px 5px 5px" fontSize="16px">
            댓글1
          </TextStyle>
          <TextStyle margin="0px 0px 0px 5px" fontSize="14px">
            작성자
          </TextStyle>
        </CommentContainerStyle>
        <CommentContainerStyle direction="row" margin="10px 10px 0px 5px">
          <IconButton aria-label="delete" size="small">
            <CreateIcon />
          </IconButton>{" "}
          <IconButton aria-label="delete" size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </CommentContainerStyle>
      </CommentContainerStyle>
    </StyleCommentItem>
  );
}

export default CommentListComponent;
