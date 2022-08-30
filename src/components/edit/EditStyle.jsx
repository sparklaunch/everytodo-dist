import styled from "styled-components";

const EditPostBox = styled.div`
  width: 650px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 200px;
  box-shadow: 1px 1px 10px 3px gray;
  padding-right: 20px;
`;

const EditPostForm = styled.div`
  width: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EditInputBoxes = styled.div`
  width: 400px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
`;
const EditInputs = styled.input`
  width: 400px;
  height: 40px;
  display: flex;
  border-style: solid;
  border-color: #e0e0e0;
  flex-direction: column;
  align-items: flex-start;
`;

const EditPostFormButton = styled.div`
  margin-top: 30px;
  /* width: 120px; */
  /* margin-right: 20px;
  margin-left: 20px; */
`;

const NavigationButton = styled.button`
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

export {
  EditPostBox,
  EditPostForm,
  EditInputBoxes,
  EditInputs,
  EditPostFormButton,
  NavigationButton,
};
