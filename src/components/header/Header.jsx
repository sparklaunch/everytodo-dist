import HeaderStyle from "./css/HeaderStyle";
import LogoStyle from "./css/LogoStyle";
import LogoNameStyleStyle from "./css/LogoNameStyle";
import Logo from "../../image/Logo.png";

import Button from '@mui/material/Button';
import { ButtonGroup } from "@mui/material";

import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import Cookies from 'universal-cookie';

function Header() {
  const token = useToken();
  const cookies = new Cookies();
  const navigate = useNavigate();

  const logInOut = () =>{
    if(token() !== null){
      cookies.remove('access_token');
      navigate("/");
    } else {
      navigate("/login");
    }
  } 

  const onSignUp = () =>{
    navigate('/signup')
  }
  return (
    <>
      <HeaderStyle>
        <LogoStyle src={Logo}></LogoStyle>
        <LogoNameStyleStyle>EVERY TODO</LogoNameStyleStyle>
        <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
            >
            <Button style={{"height":'40px'}}
                    variant="contained"
                    onClick={logInOut}>{token() !== null ? 'Logout' : 'Login'}
            </Button>
            <Button style={{"height":'40px'}}
                    onClick={onSignUp}>회원가입
            </Button>
          </ButtonGroup>
      </HeaderStyle>
    </>
  );
}
export default Header;
