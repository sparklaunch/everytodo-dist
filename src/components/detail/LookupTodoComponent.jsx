import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getAllTodos, __deleteTodo } from "../../redux/modules/todos";
import LookupTdoDetailComponent from "./LookupTodoDetailComponent";

function LookupTodo() {
  // navigate
  const navigate = useNavigate();

  // useParam
  const param = useParams();
  const todo_id = Number(param.id);

  // dispatch
  const dispatch = useDispatch();

  // useSelector
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

  //useEffect
  useEffect(() => {
    dispatch(__getAllTodos());
  }, [dispatch]);

  /* 특정 TODO만 Detail 페이지에서 보여주기 */
  return (
    <>
      {todos
        .filter((item) => item.id === todo_id)
        .map((item) => (
          <LookupTdoDetailComponent
            key={item.id}
            todo_id={todo_id}
            todos={item}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
    </>
  );
}

export default LookupTodo;
