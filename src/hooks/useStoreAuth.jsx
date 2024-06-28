import { useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess } from "../features/auth/authSlice";
const useStoreAuth = () => {
  const dispatch = useDispatch();
  return {
    dispatch,
    loginSuccess,
    logoutSuccess,
  };
};

export default useStoreAuth;
