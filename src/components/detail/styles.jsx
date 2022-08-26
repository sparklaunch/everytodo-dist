import React from "react";
import styled from "styled-components";

const StyleTopContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyleCommentItem = styled.div`
  background-color: white;
  width: 650px;
  height: 70px;
  border-style: solid;
  border-width: 2px;
  border-color: #e0e0e0;
  border-radius: 5px;
  margin: 2px auto;
  justify-content: space-between;
`;

const StyleContent = styled.span`
  width: 650px;
  height: 300px;
  border-radius: 5px;
  border-style: solid;
  border-color: #e0e0e0;
  border-width: 2px;
  margin: 10px auto;
`;

const StyleCommentDetailStyle = styled.span`
  width: 650px;
  height: 50px;
  margin: 30px 0px 0px 22px;
`;

const StyleAddComment = styled.button`
  background-color: #ddd;
  width: 50px;
  height: 50px;
  color: black;
  font-weight: 500;
  font-size: 15px;
  border-style: solid;
  border-color: transparent;
  margin: 10px 0px 0px 0px;

  &:hover {
    background-color: #82b1ff;
    color: white;
  }
`;

const StyleInputComment = styled.input`
  width: 600px;
  height: 50px;
  border-style: solid;
  border-color: #e0e0e0;
  margin: 10px 0px 0px 25px;
`;

const StylePreviousButton = styled.button`
  background-color: #82b1ff;
  width: 70px;
  height: 35px;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  font-size: 15px;
  border-style: solid;
  border-color: transparent;
  margin: 0px 0px 15px 25px;

  &:hover {
    background-color: skyblue;
    color: white;
  }
`;

const StylePublicButton = styled.button`
  background-color: #82b1ff;
  width: 50px;
  height: 30px;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  font-size: 15px;
  border-style: solid;
  border-color: transparent;
  margin: 0px 10px 10px 5px;
`;

const StyleTitle = styled.span`
  background-color: white;
  width: 650px;
  border-style: solid;
  border-color: #e0e0e0;
  border-width: 2px;
  border-radius: 5px;
  height: 50px;
  margin: auto;
`;

const StyleButtonContainer = styled.div`
  margin-right: 15px;
`;

const StyleCommentContainer = styled.div`
  /* width: 700px; */
  display: flex;
  justify-content: ${(props) => props.transePose};
  flex-direction: ${(props) => props.direction};
  margin: ${(props) => props.margin};
`;

function CommentContainerStyle({
  children,
  direction,
  transePose,
  margin,
  ...rest
}) {
  return (
    <StyleCommentContainer
      direction={direction}
      transePose={transePose}
      margin={margin}
      {...rest}
    >
      {children}
    </StyleCommentContainer>
  );
}

const StyleContainer = styled.div`
  width: 700px;
  display: flex;
  justify-content: ${(props) => props.transePose};
  flex-direction: ${(props) => props.direction};
  margin: 10px auto;
`;

function ContainerStyle({ children, direction, transePose, ...rest }) {
  return (
    <StyleContainer direction={direction} transePose={transePose} {...rest}>
      {children}
    </StyleContainer>
  );
}

const StyleText = styled.span`
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin};
  float: left;
`;

function TextStyle({ children, margin, fontSize, ...rest }) {
  return (
    <StyleText margin={margin} fontSize={fontSize} {...rest}>
      {children}
    </StyleText>
  );
}

export {
  StyleTopContainer,
  StyleCommentItem,
  StyleContent,
  StyleCommentDetailStyle,
  StyleAddComment,
  StyleInputComment,
  StylePreviousButton,
  StylePublicButton,
  StyleTitle,
  StyleButtonContainer,
  CommentContainerStyle,
  ContainerStyle,
  TextStyle,
};
