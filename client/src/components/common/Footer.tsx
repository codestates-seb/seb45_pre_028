import React from "react";
import { styled } from "styled-components";
import { COMMON_CSS } from "../../constants/common_css";
const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 20.125rem;
  padding: 2rem 0;
  flex-flow: row wrap;
  max-width: 79rem;
  margin: 0 auto;
`;

const FooterBack = styled.footer`
  background-color: ${COMMON_CSS["footer-color"]};
`;

const FooterLogo = styled.div`
  flex: 0 0 4rem;
  position: relative;
  margin-top: -0.75rem;
  a {
    position: absolute;
  }
  img {
    width: 2rem;
    height: 2.3125rem;
  }
`;
const FooterNav = styled.div`
  display: flex;
  ul {
    flex: 1 0 auto;
    li {
      color: ${COMMON_CSS["footer-font-sub-color"]};
      font-size: 0.8rem;
      height: 1.4rem;
    }
    li:first-child {
      color: ${COMMON_CSS["footer-font-main-color"]};
      font-size: 1.1rem;

      font-weight: bold;

      margin-bottom: 0.75rem;
    }
  }
  flex: 4 1 auto;
  width: 2rem;
  height: 2.3125rem;
`;
const FooterCopyright = styled.div`
  ul {
    width: 2rem;
    height: 2rem;
  }
  flex: 1 1 auto;
  width: 2rem;
  height: 2.3125rem;
`;

const Footer = (): JSX.Element => {
  return (
    <FooterBack>
      <footer>
        <FooterContainer>
          <FooterLogo>
            <a href="/.">
              <svg
                width="32"
                height="37"
                viewBox="0 0 32 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M26.5 33V24H30.5V37H0.5V24H4.5V33H26.5Z" fill="#BCBBBB" />
                <path
                  d="M23.5 26L24.3 23L8.2 19.7L7.5 23L23.5 26ZM9.7 15.2L24.7 22.2L26.1 19.2L11.1 12.2L9.7 15.2ZM13.9 7.8L26.5 18.4L28.6 15.9L15.9 5.3L13.8 7.8H13.9ZM22 0L19.3 2L29.2 15.3L31.9 13.3L22 0ZM7.5 30H23.5V27H7.5V30Z"
                  fill="#F48024"
                />
              </svg>
            </a>
          </FooterLogo>
          <FooterNav>
            <ul>
              <li>Team</li>
              <li>💁 어떻게든 되겠지</li>
            </ul>
            <ul>
              <li>Stack</li>
              <li>React</li>
              <li>TypeScript</li>
              <li>JAVA</li>
              <li>Spring</li>
              <li>Recoil</li>
            </ul>
            <ul>
              <li>Stack</li>
              <li>React</li>
              <li>TypeScript</li>
              <li>JAVA</li>
              <li>Spring</li>
              <li>Recoil</li>
            </ul>
            <ul>
              <li>Member</li>
              <li>[FE]박진주</li>
              <li>[FE]김남구</li>
              <li>[FE]이마루한</li>
              <li>[FE]최승현</li>
              <li>[BE]민은영</li>
              <li>[BE]김소연</li>
              <li>[BE]손우진</li>
            </ul>
          </FooterNav>
          <FooterCopyright>
            <ul>
              <li>
                <a href="https://github.com/codestates-seb/seb45_pre_028">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8723 0.839844C5.34731 0.839844 0.872314 5.31484 0.872314 10.8398C0.872314 15.2648 3.73481 19.0023 7.70981 20.3273C8.20981 20.4148 8.39731 20.1148 8.39731 19.8523C8.39731 19.6148 8.38481 18.8273 8.38481 17.9898C5.87231 18.4523 5.22231 17.3773 5.02231 16.8148C4.90981 16.5273 4.42231 15.6398 3.99731 15.4023C3.64731 15.2148 3.14731 14.7523 3.98481 14.7398C4.77231 14.7273 5.33481 15.4648 5.52231 15.7648C6.42231 17.2773 7.85981 16.8523 8.43481 16.5898C8.52231 15.9398 8.78481 15.5023 9.07231 15.2523C6.84731 15.0023 4.52231 14.1398 4.52231 10.3148C4.52231 9.22734 4.90981 8.32734 5.54731 7.62734C5.44731 7.37734 5.09731 6.35234 5.64731 4.97734C5.64731 4.97734 6.48481 4.71484 8.39731 6.00234C9.19731 5.77734 10.0473 5.66484 10.8973 5.66484C11.7473 5.66484 12.5973 5.77734 13.3973 6.00234C15.3098 4.70234 16.1473 4.97734 16.1473 4.97734C16.6973 6.35234 16.3473 7.37734 16.2473 7.62734C16.8848 8.32734 17.2723 9.21484 17.2723 10.3148C17.2723 14.1523 14.9348 15.0023 12.7098 15.2523C13.0723 15.5648 13.3848 16.1648 13.3848 17.1023C13.3848 18.4398 13.3723 19.5148 13.3723 19.8523C13.3723 20.1148 13.5598 20.4273 14.0598 20.3273C16.045 19.6572 17.77 18.3813 18.9921 16.6794C20.2142 14.9774 20.8718 12.9351 20.8723 10.8398C20.8723 5.31484 16.3973 0.839844 10.8723 0.839844Z"
                      fill="#959DA5"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </FooterCopyright>
        </FooterContainer>
      </footer>
    </FooterBack>
  );
};
export default Footer;
