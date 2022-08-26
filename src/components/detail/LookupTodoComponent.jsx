import React from "react";
import { useNavigate } from "react-router-dom";
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

function LookupTodo() {
  // navigate
  const navigate = useNavigate();

  return (
    <>
      <ContainerStyle direction="row" transePose="space-between">
        <StylePreviousButton
          onClick={() => {
            navigate(-1);
          }}
        >
          이전으로
        </StylePreviousButton>
        <StyleButtonContainer>
          <IconButton aria-label="delete" size="small">
            <CreateIcon />
          </IconButton>{" "}
          <IconButton aria-label="delete" size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </StyleButtonContainer>
      </ContainerStyle>
      <ContainerStyle direction="column" transePose="center">
        <StyleTitle>
          <TextStyle margin="10px 0px 0px 10px" fontSize="18px">
            제목 :{" "}
          </TextStyle>
        </StyleTitle>
        <StyleContent>
          <TextStyle margin="10px 0px 0px 10px" fontSize="16px">
            본문
          </TextStyle>
        </StyleContent>
      </ContainerStyle>
    </>
  );
}

export default LookupTodo;
