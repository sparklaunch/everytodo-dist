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
import useDateTime from "../../hooks/useDateTime";
import useCommentInput from "../../hooks/useCommentInput";

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
  const dateTime = useDateTime();

  /* 댓글 입력 */
  const [inputs, setInput, onChangeHandler] = useCommentInput({
    todoId: todo_id,
    userID: userID,
    comment: "",
    createdAt: dateTime,
    editCheck: false,
  });

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
                  onChange={onChangeHandler}
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
                onChange={onChangeHandler}
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
