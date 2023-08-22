const logout = async () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("member_id");
};

export default logout;
