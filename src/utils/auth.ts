export const getAuthToken = (): string | null => {
  return localStorage.getItem("@FogoZero:token");
};

export const isUserLoggedIn = (): boolean => {
  const token = getAuthToken();
  // Uma verificação simples: se existe token, está logado.
  return !!token;
};

export const isUserLogged = (): boolean => {
  const token = getAuthToken();

  if(token){
  return true;
  }
  else return false;
};


export const getLoggedUser = () => {
  const user = localStorage.getItem("@FogoZero:user");
  return user ? JSON.parse(user) : null;
};