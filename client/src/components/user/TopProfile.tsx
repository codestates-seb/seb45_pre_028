import styled from "styled-components";
import { memberState } from "../../atoms/atoms";
import { COMMON_CSS } from "../../constants/common_css";
import { useFetch } from "../../hooks/useFetch";
import { ProfileProp } from "../../pages/Member";
import { getAccessToken, getUserId } from "../../util/auth";

const StyledProfile = styled.section`
  position: relative;
  margin: 0 0 1rem;

  h2 {
    font-size: 2.125rem;
  }

  p {
    color: ${COMMON_CSS["font-color-gray"]};
    font-size: 1.3125rem;
  }

  .edit-button {
    padding: 0.6rem;
    background: #fff;
    color: ${COMMON_CSS["font-color-black"]};
    font-size: 0.75rem;
    border: 1px solid ${COMMON_CSS["footer-font-main-color"]};
    border-radius: 6px;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 0.1875rem;

    &:hover,
    &:focus {
      outline: none;
      background: #f8f9f9;
    }
  }
`;

const TopProfile = ({ setActiveTab }: ProfileProp): JSX.Element => {
  const memberId = getUserId();
  const token = getAccessToken();
  const { data } = useFetch(memberState, `/member/${memberId}`, token);

  return (
    <StyledProfile>
      <button
        className="edit-button"
        onClick={() => {
          setActiveTab(1);
        }}
      >
        <svg
          aria-hidden="true"
          className="svg-icon iconPencil"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            fill={COMMON_CSS["font-color-black"]}
            d="m2 13.13 8.5-8.5 2.88 2.88-8.5 8.5H2v-2.88Z"
          ></path>
          <path
            fill={COMMON_CSS["font-color-black"]}
            d="m13.68 2.15 2.17 2.17c.2.2.2.51 0 .71L14.5 6.39l-2.88-2.88 1.35-1.36c.2-.2.51-.2.71 0Z"
          ></path>
        </svg>
        Edit profile
      </button>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
    </StyledProfile>
  );
};

export default TopProfile;
