import axios from "axios";
import { redirect } from "react-router-dom";

const logout = () => {
  axios.defaults.headers.common["인증"] = undefined;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  redirect("/login");
};

export default logout;
