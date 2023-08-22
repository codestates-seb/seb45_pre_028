import { styled } from "styled-components";

const SocialLogInComponent = styled.div`
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
    width: 17.5rem;
    border-radius: 5px;
    padding: 0.625rem;
    cursor: pointer;
    & > img {
      width: 1.25rem;
      border-radius: 5px;
      margin-right: 0.5rem;
      transition: 0.3s linear;
    }
    & > span {
      font-size: 0.8125rem;
    }

    &:hover img {
      transform: scale(1.2);
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

const SocialLogIn = (): JSX.Element => {
  return (
    <SocialLogInComponent>
      <div>
        <img
          src="data:image/png;base64,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"
          alt="google"
        ></img>
        <span>Log in with Google</span>
      </div>
      <div>
        <img
          src="data:image/png;base64,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"
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
    </SocialLogInComponent>
  );
};

export default SocialLogIn;
