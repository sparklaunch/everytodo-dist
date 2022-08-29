import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { StyleCommentItem, CommentContainerStyle, TextStyle } from "./styles";

function CommentListComponent({
  todo_id,
  commentList,
  onDeleteComment,
  onChangeEditStatus,
  onUpdateComment,
}) {
  return (
    <>
      {commentList.map((item) => (
        <CommentItemComponent
          key={item.id}
          id={item.id}
          todo_id={todo_id}
          comment={item.comment}
          editCheck={item.editCheck}
          userName={item.userName}
          onDeleteComment={onDeleteComment}
          onChangeEditStatus={onChangeEditStatus}
          onUpdateComment={onUpdateComment}
        />
      ))}
    </>
  );
}

function CommentItemComponent({
  id,
  todo_id,
  comment,
  editCheck,
  userName,
  onDeleteComment,
  onChangeEditStatus,
  onUpdateComment,
}) {
  const [inputs, setInputs] = useState({
    todoId: todo_id, // Id를 1로 설정했다가 2로 변경하고 setInputs도 2로 값을 변경하면 데이터 삭제시 todoid가 2인것이 전부 삭제됨...
    userId: "",
    comment: "",
    userName: "",
    createdAt: 2022,
    editCheck: false,
  });
  /* 댓글 입력하기 */
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  return (
    <>
      {!editCheck ? (
        <StyleCommentItem>
          <CommentContainerStyle direction="row" transePose="space-between">
            <CommentContainerStyle direction="column" margin="5px 0px 0px 10px">
              <TextStyle margin="7px 0px 5px 5px" fontSize="16px">
                {comment}
              </TextStyle>
              <TextStyle margin="0px 0px 0px 5px" fontSize="14px">
                {userName}
              </TextStyle>
            </CommentContainerStyle>
            <CommentContainerStyle direction="row" margin="10px 10px 0px 5px">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => onChangeEditStatus(id)}
              >
                <CreateIcon />
              </IconButton>{" "}
              <IconButton
                aria-label="delete"
                size="small"
                color="error"
                onClick={() => onDeleteComment(id)}
              >
                <DeleteIcon />
              </IconButton>
            </CommentContainerStyle>
          </CommentContainerStyle>
        </StyleCommentItem>
      ) : (
        <StyleCommentItem>
          <CommentContainerStyle direction="row" transePose="space-between">
            <CommentContainerStyle direction="column" margin="5px 0px 0px 10px">
              {/* <TextStyle margin="7px 0px 5px 5px" fontSize="16px">
                {comment}
              </TextStyle> */}
              <input
                name="comment"
                defaultValue={comment}
                onChange={onChange}
              />
              <TextStyle margin="0px 0px 0px 5px" fontSize="14px">
                {userName}
              </TextStyle>
            </CommentContainerStyle>
            <CommentContainerStyle direction="row" margin="10px 10px 0px 5px">
              <button onClick={() => onChangeEditStatus(id)}>취소</button>
              <button onClick={() => onUpdateComment(id, inputs)}>완료</button>
            </CommentContainerStyle>
          </CommentContainerStyle>
        </StyleCommentItem>
      )}
    </>
  );
}

export default CommentListComponent;
