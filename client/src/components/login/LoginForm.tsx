/* eslint-disable prettier/prettier */
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const LogInFormComponent = styled.form`
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

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.625rem;
    font-weight: 600;
    span:last-child {
      font-size: 0.75rem;
      color: #89a2ff;
      cursor: pointer;
    }
  }

  & > input {
    height: 1.875rem;
    border-radius: 7px;
    outline: none;
    border: 1px solid rgba(128, 128, 128, 0.5);
    &:focus {
      box-shadow: 0px 0px 6px rgba(0, 0, 255, 0.3);
    }
  }

  & > span {
    font-size: 0.75rem;
    margin-top: 0.3125rem;
    margin-bottom: 0.9375rem;
    opacity: 0.7;
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

interface LogInForm {
  username: string;
  password: string;
  formError: string;
}

const LoginForm = (): JSX.Element => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LogInForm>();

  const onValid = async (data: { username: string; password: string }) => {
    console.log(data);
    const response = await axios.post("/login", data);
    if (!response) {
      setError("formError", {
        message: "이메일, 혹은 비밀번호가 올바른지 확인해주십시요",
      });
    } else {
      try {
        const getLogin = async () => {
          const { accessToken, memberId } = response.data;
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("member_id", memberId);
          navigate("/");
        };
        getLogin();
      } catch (error) {
        console.log(`에러 ${error}`);
      }
    }
  };

  return (
    <LogInFormComponent onSubmit={handleSubmit(onValid)}>
      <div>Email</div>
      <input {...register("username", { required: "이메일을 입력해주세요" })}></input>
      {errors ? <span>{errors?.username?.message}</span> : null}
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
      <input {...register("password", { required: "패스워드를 입력해주세요" })}></input>
      {errors ? <span>{errors?.password?.message}</span> : null}
      <button>Log in</button>
      {errors ? <span>{errors?.formError?.message}</span> : null}
    </LogInFormComponent>
  );
};

export default LoginForm;
