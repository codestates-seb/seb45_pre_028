import axios from "axios";

const logout = async () => {
  axios.defaults.headers.common["Authorization"] = undefined;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("memberId");
};

export default logout;
