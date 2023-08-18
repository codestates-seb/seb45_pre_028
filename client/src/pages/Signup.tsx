import { styled } from "styled-components";

// import Components
import Header from "../components/common/Header";
import SocialLogIn from "../components/login/SocialLogin";
import SignInFooter from "../components/signup/SingnUpFooter";
import SignInForm from "../components/signup/SingupForm";
import TextBox from "../components/signup/textContainer";

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
