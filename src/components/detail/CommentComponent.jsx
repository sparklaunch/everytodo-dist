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

function CommentComponent() {
  // navigate
  const navigate = useNavigate();

  // dispatch
  const dispatch = useDispatch();

  // useParams
  const param = useParams();
  const todo_id = Number(param.id);

  // store에서 데이터 가져오기
  const { isLoading, error, comments } = useSelector((state) => state.comments);

  const [inputs, setInputs] = useState({
    todoId: todo_id, // Id를 1로 설정했다가 2로 변경하고 setInputs도 2로 값을 변경하면 데이터 삭제시 todoid가 2인것이 전부 삭제됨...
    userId: "",
    comment: "",
    userName: "",
    createdAt: 2022,
    editCheck: false,
  });

  const { comment, userName, editCheck } = inputs;

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

    // 초기화
    setInputs({
      todoId: todo_id,
      userId: "",
      comment: "",
      userName: "",
      createdAt: 2022,
      editCheck: false,
    });
  };

  /* [DELETE] 댓글 삭제하기 */
  const onDeleteComment = (id) => {
    dispatch(__deleteComments(id));
  };

  /* [EDIT_CHECK] 댓글 상태 변경하기 */
  const onChangeEditStatus = (id) => {
    dispatch(checkEdit(id));
  };

  /* [UDPATE] 댓글 상태 변경하기 */
  const onUpdateComment = (id, updateComment) => {
    dispatch(__updateComments({ id, updateComment }));
    dispatch(checkEdit(id));
  };

  useEffect(() => {
    dispatch(_getComments());
  }, [dispatch]); //comment값이 등록되면 화면에 즉시 반영해줘야 함 -> comments로 넣으면 서버가 계속 돌아감... 따라서 Inputs값으로 넣어줬는데 맞는지 모르겠음 -> inputs값을 넣으면 안되고, redux 모듈에서 Post 설정해서 바뀐 값을 가져와야 한다.

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
