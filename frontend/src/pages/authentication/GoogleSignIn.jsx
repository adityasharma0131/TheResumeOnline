import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import { Google } from "../../static/images/icons/index";
import { login, setAuthError } from "../../store/slices/authSlice";

const GoogleSignIn = ({ label }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const backendResponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/user/google`,
          { code: response.code },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        const data = backendResponse.data;
        if (data) {
          navigate("/dashboard");
        }
        const token = data.accessToken;
        dispatch(
          login({
            error: null,
            user: data.user,
            token,
            tokenExpiration: data.tokenExpiration,
          })
        );
        localStorage.setItem("authToken", token);
        return token;
      } catch (error) {
        const apiError = error.response.data.message || "Error during signup";
        dispatch(setAuthError(apiError));
      }
    },
    onError: (error) => {
      console.error("Error during Google Sign-In", error);
    },
    flow: "auth-code", // Ensure the response contains an authorization code
  });

  return (
    <button className="social-btn" onClick={googleLogin}>
      <img src={Google} alt="Google" />
      <span>{label}</span>
    </button>
  );
};

export default GoogleSignIn;
