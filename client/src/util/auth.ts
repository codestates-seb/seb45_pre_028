export const getAccessToken = () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return null;
  }

  return token;
};
