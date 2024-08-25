import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import AbstractImages from "../../static/images/abstract";
import { login, setAuthError } from "../../store/slices/authSlice";
import FormInput from "../../components/FormInput";
import { registerSchema } from "../../schemas/index";
import GoogleSignIn from "./GoogleSignIn";
import { Breadcrumb } from "../../components";

// Random Number generator
const randomIndex = Math.floor(Math.random() * AbstractImages.length);
const randomImage = AbstractImages[randomIndex];

const Register = () => {
  const dispatch = useDispatch();

  // Submit Form
  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/register`,
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
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: registerSchema,
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
              <h1 className="heading text-dark mt-5 mb-3">Let's Get Started</h1>
              <h6 className="mb-10">
                Carefully read and fill all the inputs with your original
                information
              </h6>

              <FormInput
                label="Full Name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
              />
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
              <FormInput
                label="Confirm Password"
                type="password"
                name="password2"
                value={values.password2}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password2 && errors.password2}
              />

              {errors.apiError && (
                <span className="block text-sm text-red-500 mb-4">
                  {errors.apiError}
                </span>
              )}

              <button type="submit" className="button" disabled={isSubmitting}>
                {isSubmitting ? "Submitting" : "Register"}
              </button>
            </form>
            <p className="mt-5 mb-5">
              Already a member? <Link to="/login">Login</Link>
            </p>
            <GoogleSignIn label="Sign Up with Google" />
          </div>
        </div>
        <div className="image">
          <img src={randomImage} alt="Abstract" />
        </div>
      </div>
    </>
  );
};

export default Register;
