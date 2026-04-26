export const getAuthToken = (): string | null => {
  return localStorage.getItem("@FogoZero:token");
};

export const isUserLogged = (): boolean => {
  return !!getAuthToken();
};

export const getLoggedUser = () => {
  const user = localStorage.getItem("@FogoZero:user");
  return user ? JSON.parse(user) : null;
};
