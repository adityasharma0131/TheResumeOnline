import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import AbstractImages from "../../static/images/abstract";
import { login, setAuthError } from "../../store/slices/authSlice";
import FormInput from "../../components/FormInput";
import { loginSchema } from "../../schemas/index";
import GoogleSignIn from "./GoogleSignIn";
import { Breadcrumb } from "../../components";

// Random Number generator
const randomIndex = Math.floor(Math.random() * AbstractImages.length);
const randomImage = AbstractImages[randomIndex];

const Login = () => {
  const dispatch = useDispatch();

  // Submitting Form
  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/login`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const token = response.data.data.accessToken;
      dispatch(
        login({
          error: null,
          user: response.data.data.user,
          token,
          tokenExpiration: response.data.tokenExpiration,
        })
      );
      localStorage.setItem("authToken", token);
      return token;
    } catch (error) {
      setSubmitting(false);
      if (error.response) {
        const apiError = error.response.data.message || "An error occurred";
        setErrors({ apiError });
        dispatch(setAuthError(apiError));
      } else if (error.request) {
        const apiError = "No response from server";
        setErrors({ apiError });
        dispatch(setAuthError(apiError));
      } else {
        const apiError = "An error occurred while making the request";
        setErrors({ apiError });
        dispatch(setAuthError(apiError));
      }
    }
  };

  // Formik
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb />

      <div className="authentication">
        <div className="form">
          <div className="content">
            <form onSubmit={handleSubmit}>
              <h1 className="heading text-dark mt-5 mb-3">Welcome Back</h1>
              <h6 className="mb-10">
                Carefully read and fill all the inputs with your original
                information
              </h6>
              <FormInput
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
              />
              <p className="text-end">
                <Link className="text-sm" to="/forgot-password">
                  Forgot Password?
                </Link>
              </p>
              {errors.apiError && (
                <span className="block text-sm text-red-500 mb-4">
                  {errors.apiError}
                </span>
              )}
              <button type="submit" className="button" disabled={isSubmitting}>
                {isSubmitting ? "Submitting" : "Login"}
              </button>
            </form>
            <p className="mt-5 mb-5">
              Not a member? <Link to="/register">Register</Link>
            </p>
            <GoogleSignIn label="Sign In with Google" />
          </div>
        </div>
        <div className="image">
          <img src={randomImage} alt="Abstract" />
        </div>
      </div>
    </>
  );
};

export default Login;
