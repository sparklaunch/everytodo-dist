import React from "react";

import Header from "../header/Header";
import LookupTodo from "./LookupTodoComponent";
import CommentComponent from "./CommentComponent";

import { StyleTopContainer } from "./styles";

function Detail() {
  return (
    <>
      <Header></Header>
      <StyleTopContainer>
        {/* todo 디테일 조회 */}
        <LookupTodo />
        {/* todo 댓글 등록 및 조회 */}
        <CommentComponent></CommentComponent>
      </StyleTopContainer>
    </>
  );
}

export default Detail;
