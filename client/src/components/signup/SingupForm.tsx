/* eslint-disable prettier/prettier */
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";

const SignInFormComponent = styled.form`
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

  & > p {
    font-size: 0.75rem;
    margin-bottom: 1.25rem;
    line-height: 1.0625rem;
    opacity: 0.6;
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

interface SignInForm {
  name: string;
  email: string;
  password: string;
  formError: string;
}

const SignInForm = () => {
  // navigate 설정
  const navigate = useNavigate();

  // useForm 함수 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInForm>();

  const onValid = async (data: { email: string; name: string; password: string }) => {
    try {
      console.log(data);
      const response = await axios.post("/member/signup", data, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      if (!response) {
        setError("formError", {
          message: "회원가입 정보가 유효하지 않습니다. 이미 가입된 이메일 계정인지 확인해주십시요",
        });
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("서버 에러");
      console.log(error);
    }
  };

  return (
    <SignInFormComponent onSubmit={handleSubmit(onValid)}>
      <div>Email</div>
      <input
        {...register("email", {
          required: "필수 입력 사항입니다.",
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            message: "올바른 이메일 형식을 입력해주세요",
          },
        })}
      ></input>
      {errors ? <span>{errors?.email?.message}</span> : null}
      <div>User name</div>
      <input
        {...register("name", {
          required: "필수 입력 사항입니다.",
          validate: {
            checklength: (value) => (value.length < 2 ? "최소 2 글자를 입력해야 합니다" : true),
          },
        })}
      ></input>
      {errors ? <span>{errors?.name?.message}</span> : null}

      <div>Password</div>
      <input
        {...register("password", {
          required: "필수 입력 사항입니다.",
          validate: {
            checkLength: (value) => (value.length < 8 ? "최소 8자를 입력해야 합니다" : true),
          },

          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
            message: "비밀번호 규정을 지켜 입력해주세요",
          },
        })}
        type="password"
      ></input>
      {errors ? <span>{errors?.password?.message}</span> : null}
      <p>비밀번호는 하나의 문자와 숫자를 포함하여, 8글자 이상 입력해야합니다.</p>
      {errors ? <span>{errors.formError?.message}</span> : null}
      <button>Sign up</button>
    </SignInFormComponent>
  );
};

export default SignInForm;
