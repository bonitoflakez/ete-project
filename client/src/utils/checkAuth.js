const checkAuth = () => {
  const userIdAvailable = localStorage.getItem("userId");
  return !!userIdAvailable;
};

export { checkAuth };
