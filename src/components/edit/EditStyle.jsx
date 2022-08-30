import styled from "styled-components";

const EditPostBox = styled.div`
width: 650px;
height: 340px;
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

const EditPostForm =styled.div`
     width: 650px;
    display: flex;
    flex-direction: column;
    align-items: center;   
`;

const PostInputs =styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const EditPostFormButton =styled.div`
    margin-top: 30px;
    width: 120px;
    margin-right: 20px;
    margin-left: 20px;    
`;

export {
EditPostBox,
EditPostForm,
PostInputs,
EditPostFormButton

}
