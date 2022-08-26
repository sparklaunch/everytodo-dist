import React from "react";
import styled from "styled-components";

const StyleLogo = styled.img`
  height: 50px;
  margin: 5px 0px 0px 10px;
  display: flex;
  flex-direction: row;
`;

function LogoStyle({ children, ...rest }) {
  return <StyleLogo {...rest}>{children}</StyleLogo>;
}

export default LogoStyle;
