import React, { useEffect, useState } from "react";
import "./EditStyle";
import { useHistory, useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { __getTodos, __updateTodo } from "../../redux/modules/todos";
import {
  EditPostBox,
  EditPostForm,
  EditInputBoxes,
  EditInputs,
  EditPostFormButton,
  NavigationButton,
} from "./EditStyle";

function EditPost() {
  // navigate
  const navigate = useNavigate();

  // todoId useParmams 이용해서 가져오기
  const param = useParams();
  const todo_id = Number(param.id);

  // inputs
  const [inputs, setInputs] = useState({
    id: todo_id, // todoId 넣어주기
    title: "",
    content: "",
    user_id: "",
  });

  const { id, title, content } = inputs;

  // useSelect
  const { todos } = useSelector((state) => state.todos);
  console.log("data확인", todos);

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
    dispatch(__getTodos(todo_id)); //todoId 넣어주기
  }, [dispatch]);

  return (
    <>
      <Header></Header>
      <EditPostBox>
        <EditPostForm>
          <div>
            <EditInputBoxes>
              <label>제목</label>
              {/* <TextField
                fullWidth
                label="5자 이상 작성해주세요!"
                id="edit-title"
              /> */}
              <EditInputs
                placeholder="5자 이상 작성해주세요"
                name="title"
                value={title}
                onChange={onChange}
              />
            </EditInputBoxes>
            <EditInputBoxes>
              <label>내용</label>
              {/* <TextField
                fullWidth
                label="오늘은 뭘 해볼까요?"
                id="edit-comment"
              /> */}
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
            {/* <Button variant="contained">이전으로</Button>
            <Button variant="contained" onClick={() => onUpdatePost(inputs)}>
              수정하기
            </Button> */}
          </div>
        </EditPostForm>
      </EditPostBox>
    </>
  );
}

export default EditPost;
