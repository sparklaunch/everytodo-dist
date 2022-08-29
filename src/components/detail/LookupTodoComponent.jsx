import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { __getTodos, __deleteTodo } from "../../redux/modules/todos";
import {
  StyleContent,
  StylePreviousButton,
  StyleTitle,
  StyleButtonContainer,
  ContainerStyle,
  TextStyle,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";

function LookupTodo() {
  // navigate
  const navigate = useNavigate();

  // useParams
  const param = useParams();
  const todo_id = Number(param.id);
  console.log("params확인", todo_id);

  // dispatch
  const dispatch = useDispatch();

  // useSelector -  특정 todos만 가져옴
  const { todos } = useSelector((state) => state.todos);
  console.log("data들", todos);

  // [DELETE] 특정 id의 todo 삭제
  const onDeleteTodo = (id) => {
    console.log("id확인", id);
    if (id) {
      alert("정말 삭제하실건가요?");
      dispatch(__deleteTodo(todo_id));
      alert("삭제가 완료되었습니다");
      navigate(`/`);
    }
  };

  // useEffect;
  useEffect(() => {
    dispatch(__getTodos(todo_id));
  }, [dispatch]);

  return (
    <>
      {todos
        .filter((item) => item.id === todo_id)
        .map((item) => (
          <LoopupTdoDetailComponent
            key={todo_id}
            todo_id={item.todo_id}
            todos={item}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
    </>
  );
}

function LoopupTdoDetailComponent({ todo_id, todos, onDeleteTodo }) {
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

export default LookupTodo;
