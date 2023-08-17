import { styled } from "styled-components";

// import Components
import SocialLogIn from "../components/login/SocialLogin";
import SignInForm from "../components/singup/SingupForm";
import SignInFooter from "../components/singup/SingnUpFooter";
import TextBox from "../components/singup/textContainer";
import Header from "../components/common/Header";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f2f3;
`;

//  회원가입 Form 스타일 구성
const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 100px;
`;

const SignUp = (): JSX.Element => {
  return (
    <>
      <Header />
      <Container>
        <TextBox></TextBox>
        <SignInContainer>
          <SocialLogIn />
          <SignInForm />
          <SignInFooter></SignInFooter>
        </SignInContainer>
      </Container>
    </>
  );
};

export default SignUp;
