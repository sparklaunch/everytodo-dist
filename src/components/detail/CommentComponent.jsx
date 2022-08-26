import React, { useState } from "react";
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

  /* 댓글 등록 초기값 설정 */
  const [inputs, setInputs] = useState({
    comment: "",
  });

  const { comment } = inputs;

  /* 댓글 input onCahge 설정 */
  const onChange = (e) => {
    // e.target 에서 name(key)와 value 추출하기
    const { name, value } = e.target;

    // setInputs을 안해주면 input창에 변화가 없음
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <>
      {/* 댓글 작성 컴포넌트 */}
      <ContainerStyle direction="row">
        <StyleInputComment
          placeholder="댓글을 입력하세요"
          name="comment"
          value={comment}
          onChange={onChange}
        />
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
