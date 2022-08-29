import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@mui/icons-material/Create";
import {
  __getAllTodos,
  __getTodos,
  __deleteTodo,
} from "../../redux/modules/todos";
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
  /* navigate */
  const navigate = useNavigate();

  /* useParams */
  const param = useParams();
  const todo_id = Number(param.id);

  /* dispatch */
  const dispatch = useDispatch();

  /* useSelector */
  // db에서 가져온(Get) 데이터들을 store에 상태를 저장하고 저장된 상태를 가져옴
  const { todos } = useSelector((state) => state.todos);

  /* [DELETE] 특정 todo를 삭제  */
  const onDeleteTodo = (id) => {
    if (id) {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        dispatch(__deleteTodo(todo_id));
        alert("삭제되었습니다.");
        navigate(`/`);
      } else {
        alert("취소합니다.");
      }
    }
  };

  /* useEffect */
  // 의존성 배열에 dispatch를 담고, 값의 변화가 있을 때마다 리렌더링 시킴
  useEffect(() => {
    dispatch(__getAllTodos());
  }, [dispatch]);

  /* 특정 TODO만 Detail 페이지에서 보여주기 */
  return (
    <>
      {todos
        .filter((item) => item.id === todo_id)
        .map((item) => (
          <LoopupTdoDetailComponent
            key={todo_id}
            todo_id={todo_id}
            todos={item}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
    </>
  );
}
/* 특정 TODO만 보여주는 컴포넌트 */
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
