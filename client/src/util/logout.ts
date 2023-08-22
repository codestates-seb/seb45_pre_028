const logout = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("memberId");
};

export default logout;
