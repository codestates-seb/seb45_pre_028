import { styled } from "styled-components";
import Header from "../components/common/Header";

// Login Components
import LinkSignUp from "../components/login/LoginFooter";
import LoginForm from "../components/login/LoginForm";
import SocialLogIn from "../components/login/SocialLogin";

const LogInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f1f2f3;
  height: 93.9vh;
  & > img {
    width: 4.0625rem;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.5s linear;
    &:hover {
      transform: scale(1.3);
    }
  }
`;

const LogIn = (): JSX.Element => {
  return (
    <>
      <Header></Header>
      <LogInContainer>
        <img
          src="data:image/png;base64,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"
          alt="logo"
        />
        <SocialLogIn />
        <LoginForm></LoginForm>
        <LinkSignUp></LinkSignUp>
      </LogInContainer>
    </>
  );
};

export default LogIn;
