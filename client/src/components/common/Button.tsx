import styled from "styled-components";
import { COMMON_CSS } from "../../constants/common_css";

interface ButtonProp {
  children: string;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

const StyledButton = styled.button`
  background: ${COMMON_CSS["button-color"]};
  padding: 0.8125rem;
  margin: 0.625rem 0 0;
  border-radius: 6px;
  border: none;
  color: #fff;

  &:hover,
  &:focus {
    outline: none;
    background: ${COMMON_CSS["button-hover-color"]};
  }
`;

const Button = ({ children, onClick, onKeyDown }: ButtonProp): JSX.Element => {
  return (
    <StyledButton onClick={onClick} onKeyDown={onKeyDown}>
      {children}
    </StyledButton>
  );
};

export default Button;
