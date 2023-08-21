import axios from "axios";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { COMMON_CSS } from "../../constants/common_css";
import { ProfileProp } from "../../pages/Member";
import { Member } from "../../types/types";
import { getAccessToken } from "../../util/auth";
import Button from "../common/Button";

const StyledSetting = styled.section`
  h1 {
    font-size: 1.6875rem;
    padding: 0 0 1rem;
    margin: 0 0 1.5rem;
    border-bottom: 1px solid ${COMMON_CSS["border-color"]};
  }

  h4 {
    font-size: 1.3125rem;
    margin: 0 0 0.5rem;
  }

  .input-box {
    border: 1px solid ${COMMON_CSS["border-color"]};
    padding: 1.5rem;
    margin: 0 0 3rem;
    border-radius: 6px;
    display: flex;
    flex-flow: column;
    gap: 0.75rem;

    input {
      width: 100%;
      max-width: 26.25rem;
    }

    label {
      font-weight: 600;
    }

    input,
    textarea {
      border: 1px solid ${COMMON_CSS["footer-font-main-color"]};
      padding: 0.4875rem 0.5687rem;
      border-radius: 6px;

      &:focus {
        outline: none;
        border: 1px solid ${COMMON_CSS["input-focus-border"]};
        box-shadow: ${COMMON_CSS["input-focus-shadow"]};
      }
    }

    textarea {
      min-height: 15rem;
    }
  }

  .button-layout {
    display: flex;
    flex-flow: row;
    gap: 0.5rem;

    .cancel-button {
      background: #fff;
      padding: 0.8125rem;
      margin: 0.625rem 0 0;
      border-radius: 6px;
      border: none;
      color: ${COMMON_CSS["button-color"]};

      &:hover,
      &:focus {
        outline: none;
        background: #cde9fe;
      }
    }
  }
`;

const Setting = ({ setActiveTab }: ProfileProp): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const token = getAccessToken();

  const onSubmit = async (data: Member) => {
    await axios.patch("/member/1", data, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        Authorization: `Bearer ${token}`,
      },
    });
    setActiveTab(0);
  };

  return (
    <StyledSetting>
      <h1>Edit your profile</h1>
      <h4>Information</h4>
      <div className="input-box">
        <label htmlFor="">Display name</label>
        <input {...register("name")} />

        <label htmlFor="">Password</label>
        <input {...register("password")} />
        {/* 
        <label htmlFor="">About me</label>
        <textarea {...register("about")}></textarea> */}
      </div>
      <div className="button-layout">
        <Button onClick={handleSubmit(onSubmit)}>Save profile</Button>
        <button
          className="cancel-button"
          onClick={() => {
            setActiveTab(0);
          }}
        >
          Cancel
        </button>
      </div>
    </StyledSetting>
  );
};

export default Setting;
