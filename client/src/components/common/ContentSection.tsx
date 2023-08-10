import styled from "styled-components";
import { COMMON_CSS } from "../../constants/common_css";

interface ContentSectionProp {
  children: JSX.Element;
}

const StyledContent = styled.main`
  width: calc(100% - 10.25rem);
  border-left: 1px solid ${COMMON_CSS["border-color"]};
`;

const ContentSection = ({ children }: ContentSectionProp): JSX.Element => {
  return <StyledContent>{children}</StyledContent>;
};

export default ContentSection;
