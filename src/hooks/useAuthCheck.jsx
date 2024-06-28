import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("writerClientAuth");
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.email) {
        dispatch(loginSuccess(auth));
      }
    }
    setAuthChecked(true);
  }, []);

  return authChecked;
}
