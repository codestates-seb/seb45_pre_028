export const getAccessToken = () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return null;
  }

  return token;
};

export const getUserId = () => {
  const id = localStorage.getItem("member_id");

  if (!id) {
    return null;
  }

  return id;
};
