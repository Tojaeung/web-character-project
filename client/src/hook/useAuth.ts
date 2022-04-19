const useAuth = () => {
  const loginState = localStorage.getItem('login');

  return { isLoggedIn: loginState ? true : false };
};

export default useAuth;
