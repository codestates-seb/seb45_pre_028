import axios from "axios";
import logout from "./logout";

const tokenRefresh = async () => {
  // 로그인 시 or 재 로그인 시 로컬 스토리지 내부에 저장한 access token과 refresh token 가져옴
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  // access token의 만료 시간 획득을 위해 디코딩
  const decodedToken = jwt_decode(accessToken);
  // 만료 시간이 거의 다 되면 if 구문 실행
  if (decodedToken.exp - Math.floor(Date.now() / 1000) < 1000 * 60) {
    try {
      // refresh token 이용하여 새로운 access token 받아온 뒤에 새로운 access token을 로컬 저장소 내부에 저장한 후 새로운 access token으로 axios header 요청 설정 수정
      axios.defaults.headers.common["Authorization"] = refreshToken;
      const getNewToken = await axios.get("URL");
      localStorage.setItem("accessToken", getNewToken.data.accesstoken);
      axios.defaults.headers.common["Authorization"] = localStorage.getItem("accessToken");
    } catch (error) {
      // refresh 이용한 access token 재요청 실패할 시 모든 token 관련 설정 초기화 후 로그인 페이지로 redirect
      logout();
      alert("로그인 시간이 초과되었습니다, 다시 로그인 해주세요");
    }
  }
};

export default tokenRefresh;
