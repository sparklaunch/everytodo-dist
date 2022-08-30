import React, { useEffect, useState } from "react";
import "./EditStyle";
import { useHistory, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { __getTodos, __updateTodo } from "../../redux/modules/todos";
import {EditPostBox,
    EditPostForm,
    PostInputs,
    EditPostFormButton}
    from './EditStyle';

function EditPost() {
    // navigate
    const navigate = useNavigate();

    // todoId useParmams 이용해서 가져오기

    // inputs
    const [inputs, setInputs] = useState({
        id: 2, // todoId 넣어주기
        title: "",
        content: ""
    });

    const { id, title, content } = inputs;

    // useSelect
    const { todos } = useSelector((state) => state.todos);
    console.log("data확인", todos); //

    // dispatch
    const dispatch = useDispatch();

<<<<<<< HEAD
    // [onChange] input onChange
    const onChange = (e) => {
        const { name, value } = e.target;

        // setInputs
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    // [UPDATE] edit function
    const onUpdatePost = (updateData) => {
        console.log("update", updateData);
        dispatch(__updateTodo(updateData));

        if (updateData) {
            alert("정말 수정하시겠습니까?");
            dispatch(__updateTodo(updateData));
            alert("수정이 완료되었습니다.");
            navigate(`/`);
        }
    };

    // useEffect
    useEffect(() => {
        dispatch(__getTodos(2)); //todoId 넣어주기
    }, [dispatch]);

    return (
        <>
            <Header></Header>
            <div className="edit-post-box">
                <form className="edit-post-form">
                    <div className="edit-inputs">
                        <div>
                            <label>제목</label>
                            {/* <TextField
                fullWidth
                label="5자 이상 작성해주세요!"
                id="edit-title"
              /> */}
                            <input
                                placeholder="5자 이상 작성해주세요"
                                name="title"
                                value={title}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label>내용</label>
                            {/* <TextField
                fullWidth
                label="오늘은 뭘 해볼까요?"
                id="edit-comment"
              /> */}
                            <input
                                placeholder="오늘은 뭘 해볼까요?"
                                name="content"
                                value={content}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="edit-btns">
                        <Button variant="contained">이전으로</Button>
                        <Button
                            variant="contained"
                            onClick={() => onUpdatePost(inputs)}
                        >
                            수정하기
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
=======
  return (
    <>
      <Header></Header>
      <EditPostBox><EditPostForm>
      <div >
        <form >
          <div >
            <div>
              <label>제목</label>
              <TextField fullWidth input
                placeholder="5자 이상 작성해주세요"
                name="title"
                value={title}
                onChange={onChange}
              />
            </div>
            <div>
              <label>내용</label>
              <TextField fullWidth input
                placeholder="오늘은 뭘 해볼까요?"
                name="content"
                value={content}
                onChange={onChange}
              />
            </div>
          </div>
          <div >
            <Button variant="contained" onClick={() =>navigate(-1)}>이전으로</Button>
            <Button variant="contained" onClick={() => onUpdatePost(inputs)}>수정하기</Button> 
            {/* 수정하기 버튼 클릭시 홈 화면으로 이동해야함 */}
          </div>
        </form>
        </div>
        </EditPostForm></EditPostBox>
    </>
);
  };

>>>>>>> c2bf727c5ff50ba939c746485f4202afb722aa31
export default EditPost;
