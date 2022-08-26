import React from "react";
import HeaderStyle from "./css/HeaderStyle";
import LogoStyle from "./css/LogoStyle";
import LogoNameStyleStyle from "./css/LogoNameStyle";
import Logo from "../../image/Logo.png";

function Header() {
  return (
    <>
      <HeaderStyle>
        <LogoStyle src={Logo}></LogoStyle>
        <LogoNameStyleStyle>에브리투두</LogoNameStyleStyle>
      </HeaderStyle>
    </>
  );
}

export default Header;
