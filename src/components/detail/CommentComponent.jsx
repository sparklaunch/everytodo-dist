import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  _getComments,
  __addComments,
  __deleteComments,
  checkEdit,
  __updateComments,
} from "../../redux/modules/commentsSlice";
import {
  StyleInputComment,
  StyleAddComment,
  ContainerStyle,
  TextStyle,
} from "./styles";
import CommentListComponent from "./CommentListComponent";

/* [댓글] 등록 및 조회 컴포넌트 */
function CommentComponent() {
  /* navigate */
  const navigate = useNavigate();

  /* dispatch */
  const dispatch = useDispatch();

  /* useParams */
  const param = useParams();
  const todo_id = Number(param.id);

  /* Redux Store에서 Comments 데이터 가져오기 */
  // db에서 가져온 Comments들을 store에 저장하고, 해당 데이터를 useSelector로 가져옴
  const { isLoading, error, comments } = useSelector((state) => state.comments);

  /* DateTime 설정 */
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let createDate = year + month + day;

  /* input 입력 상태 관리 */
  const [inputs, setInputs] = useState({
    todoId: todo_id,
    userId: "",
    comment: "",
    userName: "",
    createdAt: createDate,
    editCheck: false,
  });
  // 구조분해 할당으로 inputs에서 comment값 가져오기
  const { comment } = inputs;

  /* 댓글 입력하기 */
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  /* [POST] 댓글 등록하기 */
  const onSubmitComment = (inputs) => {
    if (comment === "") {
      alert("댓글을 입력하세요");
    } else {
      dispatch(__addComments(inputs));
    }

    // Input 초기화
    // 초기화 형태를 아래처럼 지정해줘야 db에 해당 Key, value가 저장됨
    setInputs({
      todoId: todo_id,
      userId: "",
      comment: "",
      userName: "",
      createdAt: createDate,
      editCheck: false,
    });
  };

  /* [DELETE] 댓글 삭제하기 */
  const onDeleteComment = (id) => {
    dispatch(__deleteComments(id));
  };

  /* [EDIT_CHECK] 댓글 상태 변경하기 */
  // 댓글 상태 변경은 db에는 변하지 않고, 프론트단에서만 변경상태 확인
  const onChangeEditStatus = (id) => {
    dispatch(checkEdit(id));
  };

  /* [UDPATE] 댓글 업데이트하기 */
  const onUpdateComment = (id, updateComment) => {
    // 댓글 등록 후, 등록한 댓글을 수정 버튼 누르고 바로 완료버튼 누를경우 데이터가 유실됨
    if (updateComment.comment === "") {
      alert("댓글을 다시 입력하세요!");
    } else {
      dispatch(__updateComments({ id, updateComment }));
      // 업데이트가 되면 editCheck를 true로 변경시켜줌
      dispatch(checkEdit(id));
    }
  };

  /* useEffect */
  useEffect(() => {
    // 특정 todo에 해당하는 comment만 가져와야 함
    dispatch(_getComments(todo_id));
  }, [dispatch]); // 값에 변경사항이 있을 때마다 리렌더링

  /* loading or error 상태일 때 보여줄 화면*/
  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      {/* 댓글 작성 컴포넌트 */}
      <ContainerStyle direction="row">
        <StyleInputComment
          placeholder="댓글을 입력하세요"
          name="comment"
          value={comment || ""}
          onChange={onChange}
        />
        <StyleAddComment onClick={() => onSubmitComment(inputs)}>
          등록
        </StyleAddComment>
      </ContainerStyle>

      {/* 댓글 리스트 컴포넌트 */}
      <ContainerStyle direction="column" transePose="center">
        <TextStyle margin="30px 0px 10px 23px" fontSize="20px">
          댓글
        </TextStyle>
        {comments && (
          <CommentListComponent
            todo_id={todo_id}
            commentList={comments}
            onDeleteComment={onDeleteComment}
            onChangeEditStatus={onChangeEditStatus}
            onUpdateComment={onUpdateComment}
          />
        )}
      </ContainerStyle>
    </>
  );
}

export default CommentComponent;
