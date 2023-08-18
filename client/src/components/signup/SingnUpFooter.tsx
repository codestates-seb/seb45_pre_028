import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const SignInFooterComponent = styled.div`
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

const SignInFooter = () => {
  const navigate = useNavigate();

  return (
    <SignInFooterComponent>
      <div>
        <span>Already have an account?</span>
        <span
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in
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
    </SignInFooterComponent>
  );
};

export default SignInFooter;
