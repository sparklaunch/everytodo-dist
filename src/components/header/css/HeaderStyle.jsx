import React from "react";
import styled from "styled-components";

const StyleHeader = styled.div`
  background-color: #e3f2fd;
  border-style: solid;
  border-color: #f5f5f5;
  height: 70px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

function HeaderStyle({ children, ...rest }) {
  return <StyleHeader {...rest}>{children}</StyleHeader>;
}

export default HeaderStyle;
