import React from "react";
import styled from "styled-components";

const StyleLogoNameStyle = styled.span`
  height: 50px;
  margin: 18px 10px 0px 0px;
  font-size: 23px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
`;

function LogoNameStyleStyle({ children, ...rest }) {
  return <StyleLogoNameStyle {...rest}>{children}</StyleLogoNameStyle>;
}

export default LogoNameStyleStyle;
