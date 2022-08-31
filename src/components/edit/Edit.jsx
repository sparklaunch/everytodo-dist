import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import { __getTodos, __updateTodo } from "../../redux/modules/todos";
import {
  EditPostBox,
  EditPostForm,
  EditInputBoxes,
  EditInputs,
  NavigationButton,
} from "./EditStyle";
import useToken from "../../hooks/useToken";

function EditPost() {
  // navigate
  const navigate = useNavigate();

  // todoId
  const param = useParams();
  const todo_id = Number(param.id);

  // token
  const token = useToken();
  const userID = token();

  // inputs
  const [inputs, setInputs] = useState({
    id: todo_id, // todoId 넣어주기
    title: "",
    content: "",
    userID: userID,
  });

  const { id, title, content } = inputs;

  // useSelect
  const { todos } = useSelector((state) => state.todos);

  // dispatch
  const dispatch = useDispatch();

  // [onChange] input onChange
  const onChange = (e) => {
    const { name, value } = e.target;

    // setInputs
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // [UPDATE] edit function
  const onUpdatePost = (updateData) => {
    if (updateData.title !== "" && updateData.content !== "") {
      if (window.confirm("정말 수정하시겠습니까?")) {
        dispatch(__updateTodo(updateData));
        alert("수정되었습니다.");
        navigate(`/`);
      } else {
        alert("취소합니다.");
      }
    } else {
      alert("제목과 내용을 입력하세요!");
    }
  };

  // useEffect
  useEffect(() => {
    dispatch(__getTodos(todo_id));
  }, [dispatch]);

  return (
    <>
      <Header></Header>
      <EditPostBox>
        <EditPostForm>
          <div>
            <EditInputBoxes>
              <label>제목</label>
              <EditInputs
                placeholder="5자 이상 작성해주세요"
                name="title"
                value={title}
                onChange={onChange}
              />
            </EditInputBoxes>
            <EditInputBoxes>
              <label>내용</label>
              <EditInputs
                placeholder="오늘은 뭘 해볼까요?"
                name="content"
                value={content}
                onChange={onChange}
              />
            </EditInputBoxes>
          </div>
          <div>
            <NavigationButton onClick={() => navigate(`/`)}>
              이전으로
            </NavigationButton>
            <NavigationButton onClick={() => onUpdatePost(inputs)}>
              수정하기
            </NavigationButton>
          </div>
        </EditPostForm>
      </EditPostBox>
    </>
  );
}

export default EditPost;
