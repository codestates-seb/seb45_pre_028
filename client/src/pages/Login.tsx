import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../components/common/Header";

const LogInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f1f2f3;
  height: 100vh;
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

const SocialLogIn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 12.5rem;
  height: 12.5rem;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.3125rem 0rem;
    width: 18.75rem;
    border-radius: 5px;
    padding: 0.625rem;
    cursor: pointer;
    & > img {
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 5px;
      margin-right: 0.3125rem;
    }
    & > span {
      font-size: 0.8125rem;
    }
  }
  div:first-child {
    background-color: #f8f9f9;
  }
  div:nth-child(2) {
    background-color: #0a0c0d;
    color: white;
  }
  div:last-child {
    background-color: #314a86;
    color: white;
  }
`;

const LogInForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #ffffff;
  width: 17.5rem;
  padding: 2.5rem 1.25rem;
  border-radius: 10px;
  box-shadow:
    0px 10px 20px rgba(0, 0, 0, 0.1),
    0px 0px 5px rgba(0, 0, 0, 0.1);

  & > span,
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.625rem;
    font-weight: 600;
  }

  & > div {
    span:last-child {
      font-size: 0.75rem;
      color: #89a2ff;
      cursor: pointer;
    }
  }

  & > input {
    margin-bottom: 1.25rem;
    height: 1.875rem;
    border-radius: 7px;
    outline: none;
    border: 1px solid rgba(128, 128, 128, 0.5);
    &:focus {
      box-shadow: 0px 0px 6px rgba(0, 0, 255, 0.3);
    }
  }

  button {
    background-color: #0a95ff;
    color: white;
    height: 2.5rem;
    border-radius: 10px;
    border: none;
    &:hover {
      background-color: #0074cc;
      cursor: pointer;
    }
  }
`;

const LinkSignup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  div {
    margin-bottom: 0.9375rem;
    span:last-child {
      margin-left: 0.625rem;
      color: #0a95ff;
      &:hover {
        cursor: pointer;
        color: #0074cc;
      }
    }
  }

  div:first-child {
    margin-top: 2.5rem;
  }
`;

const LogIn = (): JSX.Element => {
  // useNavigate 함수 설정
  const navigate = useNavigate();

  // useForm 함수 설정

  const { register } = useForm();

  return (
    <>
      <Header></Header>
      <LogInContainer>
        <img
          src="data:image/png;base64,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"
          alt="logo"
        />
        <SocialLogIn>
          <div>
            <img
              src="data:image/png;base64,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"
              alt="google"
            ></img>
            <span>Log in with Google</span>
          </div>
          <div>
            <img
              src="data:image/jpeg;base64,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"
              alt="gitHub"
            ></img>
            <span>Log in with Github</span>
          </div>
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRBZFd_YkK7PH1wTqqpFXbuhAcaTqnszsh9Q&usqp=CAU"
              alt="facebook"
            ></img>
            <span>Log in with Facebook</span>
          </div>
        </SocialLogIn>
        <LogInForm>
          <span>Email</span>
          <input {...register("Email", { required: true })}></input>
          <div>
            <span>Password</span>
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              Forgot password?
            </span>
          </div>
          <input {...register("Password", { required: true })}></input>
          <button>Log in</button>
        </LogInForm>
        <LinkSignup>
          <div>
            <span>Don't have an account?</span>
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              Sign up
            </span>
          </div>
          <div>
            <span>Are you an employer?</span>
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              Sign up on Talent ↗
            </span>
          </div>
        </LinkSignup>
      </LogInContainer>
    </>
  );
};

export default LogIn;
