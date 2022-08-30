import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";
import {
  StyleCommentItem,
  CommentContainerStyle,
  TextStyle,
  StyleUpdateComment,
} from "./styles";
import useToken from "../../hooks/useToken";

/* [댓글] 리스트 조회 및 수정, 삭제 컴포넌트 */
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
  // token
  const token = useToken();
  const userID = token();

  /* DateTime 설정 */
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let createDate = year + month + day;

  /* 댓글 입력 inputs 상태 */
  const [inputs, setInputs] = useState({
    todoId: todo_id,
    userID: userID,
    comment: "",
    userName: "",
    createdAt: createDate,
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
      {userID ? (
        !editCheck ? (
          <StyleCommentItem>
            <CommentContainerStyle direction="row" transePose="space-between">
              <CommentContainerStyle
                direction="column"
                margin="5px 0px 0px 10px"
              >
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
              <CommentContainerStyle
                direction="column"
                margin="5px 0px 0px 10px"
              >
                <StyleUpdateComment
                  name="comment"
                  defaultValue={comment}
                  onChange={onChange}
                />
                <TextStyle margin="0px 0px 0px 5px" fontSize="14px">
                  {userName}
                </TextStyle>
              </CommentContainerStyle>
              <CommentContainerStyle direction="row" margin="10px 0px 0px 0px">
                <Button variant="text" onClick={() => onChangeEditStatus(id)}>
                  취소
                </Button>
                <Button
                  variant="text"
                  onClick={() => onUpdateComment(id, inputs)}
                >
                  완료
                </Button>
              </CommentContainerStyle>
            </CommentContainerStyle>
          </StyleCommentItem>
        )
      ) : (
        <StyleCommentItem>
          <CommentContainerStyle direction="row" transePose="space-between">
            <CommentContainerStyle direction="column" margin="5px 0px 0px 10px">
              <StyleUpdateComment
                name="comment"
                defaultValue={comment}
                onChange={onChange}
              />
              <TextStyle margin="0px 0px 0px 5px" fontSize="14px">
                {userName}
              </TextStyle>
            </CommentContainerStyle>
          </CommentContainerStyle>
        </StyleCommentItem>
      )}
    </>
  );
}

export default CommentListComponent;
