export const useAuth = () => {
  // возвращаем флаг
  if (localStorage.getItem("isLoggedIn") === "true") return true;
  return false;
};
