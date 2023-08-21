import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// google OAuth 2.0 인증을 위한 URL 경로
const googleAuthorizeUrl: string = `https://accounts.google.com/o/oauth2/v2/auth?
scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&
include_granted_scopes=true&
response_type=token&
state=state_parameter_passthrough_value&
redirect_uri=${redirect_url}&
client_id=${cliend_id}`;

// Google OAuth 2.0 서버로 리디렉션
const GoogleAuthorize = () => {
  window.location.href = googleAuthorizeUrl;

  /* 위의 과정 종료되면 인증 코드를 URL의 params 부분에 code라는 key 값에 담은 뒤 입력한 redirect_url에 추가한 후에 해당 redirect_url로 리다이렉션 시켜줍니다. 이후 이동된 redirect_url의 
     query 부분을 통해 엑세스 토큰을 얻기 위한 코드를 얻거나 엑세스 토큰을 직접 얻어낼 수도 있습니다       */
};

const getAccessToken = async () => {
  const navigate = useNavigate();

  /* URLSearchParams 함수와 window.locatio.hash를 통해서 URL의 query 부분의 hash(#) 부분에 담긴 부분들을 추출해냅니다. 참고로 첫 번째 문자로 #가 오므로 해당 부분을 substring을 통해 제거한 뒤에
     access toeken의 key 값을 통해 access token의 값을 추출하도록 합시다.  */
  const { access_token } = new URLSearchParams(window.location.hash.substring(1));
  // access token이 존재하지 않는다면 다시 한번 google OAuth 2.0로 리디렉션 시켜주고 access token이 존재한다면 access token을 통해 구글 API 호출하여 인증 과정을 진행해줍시다.
  if (!access_token) {
    window.location.assign(googleAuthorizeUrl);
    return null;
  }

  try {
    useEffect(() => {
      const getLogin = async () => {
        await axios.get("loginURL", { headers: { Authorization: `Bearer ${access_token}` } });
        axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        localStorage.setItem("accessToken", access_token);
        navigate("/");
      };
      getLogin();
    }, [access_token]);
  } catch (error) {
    console.log(error);
  }
};

const loginByGoogle = () => {
  if (window.location.search.includes("code=")) {
    getAccessToken();
  } else {
    GoogleAuthorize();
  }
};

export default loginByGoogle;
