import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const LinkSignupComponent = styled.div`
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

const LinkSignUp = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <LinkSignupComponent>
      <div>
        <span>Don't have an account?</span>
        <span
          onClick={() => {
            navigate("/sign");
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
    </LinkSignupComponent>
  );
};

export default LinkSignUp;
