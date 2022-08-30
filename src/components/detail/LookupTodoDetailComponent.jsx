import React from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@mui/icons-material/Create";
import {
  StyleContent,
  StylePreviousButton,
  StyleTitle,
  StyleButtonContainer,
  ContainerStyle,
  TextStyle,
} from "./styles";

/* 특정 TODO만 보여주는 컴포넌트 */
function LookupTdoDetailComponent({ todo_id, todos, onDeleteTodo }) {
  // navigate
  const navigate = useNavigate();

  // token
  const token = useToken();
  const userID = token();

  return (
    <>
      <ContainerStyle direction="row" transePose="space-between">
        <StylePreviousButton
          onClick={() => {
            navigate(`/`);
          }}
        >
          이전으로
        </StylePreviousButton>
        <>
          {userID ? (
            <StyleButtonContainer>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => navigate(`/edit/${todo_id}`)}
              >
                <CreateIcon />
              </IconButton>{" "}
              <IconButton
                aria-label="delete"
                size="small"
                color="error"
                onClick={() => {
                  onDeleteTodo(todo_id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </StyleButtonContainer>
          ) : (
            <></>
          )}
        </>
      </ContainerStyle>
      <ContainerStyle direction="column" transePose="center">
        <StyleTitle>
          <TextStyle margin="10px 0px 0px 10px" fontSize="18px">
            제목 : {todos.title}
          </TextStyle>
        </StyleTitle>
        <StyleContent>
          <TextStyle margin="10px 0px 0px 10px" fontSize="16px">
            본문 : {todos.content}
          </TextStyle>
        </StyleContent>
      </ContainerStyle>
    </>
  );
}

export default LookupTdoDetailComponent;
