import React from "react";
import { useNavigate } from "react-router-dom";
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

function CommentComponent() {
  // navigate
  const navigate = useNavigate();

  return (
    <>
      {/* 댓글 작성 컴포넌트 */}
      <ContainerStyle direction="row">
        <StyleInputComment />
        <StyleAddComment>등록</StyleAddComment>
      </ContainerStyle>

      {/* 댓글 리스트 컴포넌트 */}
      <ContainerStyle direction="column" transePose="center">
        <TextStyle margin="30px 0px 10px 23px" fontSize="20px">
          댓글
        </TextStyle>
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
      </ContainerStyle>
    </>
  );
}

export default CommentComponent;
