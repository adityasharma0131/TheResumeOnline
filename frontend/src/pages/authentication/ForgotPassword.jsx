import { useFormik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";

import AbstractImages from "../../static/images/abstract";
import { FormInput } from "../../components/index";
import { forgotPasswordSchema } from "../../schemas/index";
import { Breadcrumb } from "../../components";

// Random Number generator
const randomIndex = Math.floor(Math.random() * AbstractImages.length);
const randomImage = AbstractImages[randomIndex];

const ForgotPassword = () => {
  // Submitting Form
  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/forgot-password`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      setSubmitting(false);
      if (error.response) {
        const apiError = error.response.data.message || "An error occurred";
        setErrors({ apiError });
      } else if (error.request) {
        const apiError = "No response from server";
        setErrors({ apiError });
      } else {
        const apiError = "An error occurred while making the request";
        setErrors({ apiError });
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
    },
    validationSchema: forgotPasswordSchema,
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
              <h1 className="heading text-dark mt-5 mb-3">
                Trouble Logging In?
              </h1>
              <h6 className="mb-10">
                Enter your email and we'll send you a link to get back to your
                account.
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

              {errors.apiError && (
                <span className="block text-sm text-red-500 mb-4">
                  {errors.apiError}
                </span>
              )}

              <button type="button" className="button" disabled={isSubmitting}>
                {isSubmitting ? "Submitting" : "Send Passsword Reset Link"}
              </button>
            </form>
            <p className="mt-5">
              Already a member? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
        <div className="image">
          <img src={randomImage} alt="Abstract" />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
