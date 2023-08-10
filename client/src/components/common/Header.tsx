import React from "react";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";

const HeaderContainer = styled.div`
  position: sticky;
  border-bottom: 1px solid #d6d9dc;
  div {
    display: flex;
    align-items: center;
    max-width: 100%;
    margin: 0 auto;
  }
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 150px;
  }
`;

const Select = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-left: 30px;
    padding: 10px;
    border-radius: 20px;
    &:hover {
      cursor: pointer;
      background-color: #e3e6e8;
    }
    span {
      opacity: 0.6;
      font-size: 12px;
    }
  }
`;

const Search = styled.form`
  display: flex;
  align-items: center;

  input {
    outline: none;
    width: 100%;
  }
`;

const Login = styled.div`
  display: flex;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65px;
    height: 35px;
    border-radius: 5px;
    margin: 0px 2px;

    span {
      font-size: 13px;
    }
  }

  div:first-child {
    background-color: #e1ecf4;
    color: #2c5877;
    &:hover {
      cursor: pointer;
      background-color: #b3d3ea;
    }
  }
  div:last-child {
    background-color: #0a95ff;
    color: white;
    &:hover {
      cursor: pointer;
      background-color: #0074cc;
    }
  }
`;

const Header = (): JSX.Element => {
  const { register, watch } = useForm();

  const submitSearch = () => {
    console.log(watch());
  };

  return (
    <HeaderContainer>
      <div>
        <Nav>
          <img
            src="data:image/png;base64,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"
            alt="logoImg"
          />
          <Select>
            <div>
              <span>About</span>
            </div>
            <div>
              <span>Products</span>
            </div>
            <div>
              <span>For Teams</span>
            </div>
          </Select>
        </Nav>
        <Search onSubmit={submitSearch}>
          <input {...register("search")} placeholder="Search..."></input>
        </Search>
        <Login>
          <div>
            <span>Log in</span>
          </div>
          <div>
            <span>Sign up</span>
          </div>
        </Login>
      </div>
    </HeaderContainer>
  );
};
export default Header;
