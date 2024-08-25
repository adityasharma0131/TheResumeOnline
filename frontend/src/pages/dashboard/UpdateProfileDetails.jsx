import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { profileSchema } from "../../schemas/index";
import { FormInput, FormSelect } from "../../components/index";
import { updateProfile } from "../../store/slices/authSlice";

const UpdateProfileDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isUpdated, setIsUpdated] = useState(false);
  const auth = useSelector((state) => state.auth.user);

  const sanitizeInput = (value) => (typeof value === "string" ? value : "");

  const initialValues = {
    fullName: sanitizeInput(auth.fullName),
    email: sanitizeInput(auth.email),
    phone: sanitizeInput(auth.phone),
    gender: sanitizeInput(auth.gender),
    birthDate: auth.birthDate
      ? new Date(auth.birthDate).toISOString().split("T")[0]
      : "",
    pronounce: sanitizeInput(auth.pronounce),
  };

  const onSubmit = async (values, { setErrors, setSubmitting, resetForm }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/user/update-profile`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(updateProfile(response.data.data));
      resetForm();
      setIsUpdated(true);
      setTimeout(() => setIsUpdated(false), 3000);
      navigate("/dashboard/profile");
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

  const formik = useFormik({
    initialValues,
    validationSchema: profileSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <>
      <h4 className="modal-title">Update User Detail</h4>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <FormInput
              label="Full Name"
              name="fullName"
              type="text"
              className="mb-0"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fullName && errors.fullName}
              required
            />
          </div>
          <div>
            <FormInput
              label="Email"
              name="email"
              type="email"
              className="mb-0"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              required
            />
          </div>
          <div>
            <FormInput
              label="Phone No."
              name="phone"
              type="text"
              className="mb-0"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone && errors.phone}
              required
            />
          </div>
          <div>
            <FormSelect
              label="Gender"
              name="gender"
              className="mb-0"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              options={[
                { label: "---", value: "" },
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Others", value: "Others" },
              ]}
              error={touched.gender && errors.gender}
            />
          </div>
          <div>
            <FormInput
              label="Birth Date"
              name="birthDate"
              type="date"
              className="mb-0"
              value={values.birthDate}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={touched.birthDate && errors.birthDate}
            />
          </div>
          <div>
            <FormSelect
              label="Pronounce"
              name="pronounce"
              className="mb-0"
              value={values.pronounce}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              options={[
                { label: "---", value: "" },
                { label: "He/Him", value: "He/Him" },
                { label: "She/Her", value: "She/Her" },
                { label: "They/Them", value: "They/Them" },
              ]}
              error={touched.pronounce && errors.pronounce}
            />
          </div>
        </div>
        <button type="submit" className="button mt-5" disabled={isSubmitting}>
          Update Profile
        </button>
        {isUpdated && (
          <div className="text-md text-green-500 mt-4">
            Profile updated successfully!
          </div>
        )}
        {errors.apiError && (
          <div className="text-md text-red-500 mt-4">{errors.apiError}</div>
        )}
      </form>
    </>
  );
};

export default UpdateProfileDetails;
