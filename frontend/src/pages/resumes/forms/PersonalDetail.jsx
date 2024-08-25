import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { FormInput, FormSelect, FormText } from "../../../components";
import { DummyUser } from "../../../static/images/users";
import { showAlert } from "../../../store/slices/alertSlice";
import { updatePersonalDetail } from "../../../store/slices/resumeSlice";
import { setCurrentTemplate } from "../../../store/slices/templateSlice";
import { debounce } from "../../../utils/debounce";

const PersonalDetail = () => {
  const dispatch = useDispatch();
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const resumeId = useSelector((state) => state.resume.detail.resumeId);
  const templateId = useSelector((state) => state.resume.detail.templateId);
  const personalDetail = useSelector((state) => state.resume.personalDetail);
  const selectedTemplate = useSelector(
    (state) => state.template.selectedTemplate
  );

  const initialValues = {
    jobTitle: personalDetail.jobTitle || "",
    firstName: personalDetail.firstName || "",
    middleName: personalDetail.middleName || "",
    lastName: personalDetail.lastName || "",
    email: personalDetail.email || "",
    phone: personalDetail.phone || "",
    address: personalDetail.address || "",
    city: personalDetail.city || "",
    state: personalDetail.state || "",
    zip: personalDetail.zip || "",
    drivingLicense: personalDetail.drivingLicense || "",
    nationality: personalDetail.nationality || "",
    placeOfBirth: personalDetail.placeOfBirth || "",
    dateOfBirth: personalDetail.dateOfBirth || "",
    gender: personalDetail.gender || "",
    maritalStatus: personalDetail.maritalStatus || "",
    summary: personalDetail.summary || "",
    photo: personalDetail.photo || "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        dispatch(
          showAlert({ message: "Unauthorized: No token found", type: "error" })
        );
        setSubmitting(false);
        return;
      }

      try {
        await axios.patch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/resume/${resumeId}?action=update-resume-profile`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(updatePersonalDetail(values));
        dispatch(showAlert({ message: "Details Updated", type: "success" }));
      } catch (error) {
        dispatch(
          showAlert({
            message: error.response?.data?.message || "Error updating details",
            type: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Debounced submission to handle form changes
  const debouncedSubmit = useCallback(
    debounce(() => {
      formik.submitForm();
    }, 5000),
    [formik]
  );

  // Watch for form value changes
  useEffect(() => {
    if (formik.dirty) {
      debouncedSubmit();
    }
  }, [formik.values, debouncedSubmit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.handleChange(e);
    dispatch(updatePersonalDetail({ [name]: value }));
  };

  const toggleAdditionalInfo = () => {
    setShowAdditionalInfo((prev) => !prev);
  };

  // Fetch Template Detail
  const fetchTemplateDetail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/template/${templateId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.data;
      dispatch(setCurrentTemplate(data));
    } catch (error) {
      dispatch(
        showAlert({
          message:
            error.response?.data?.message || "Error fetching Template Detail",
          type: "error",
        })
      );
    }
  };

  useEffect(() => {
    fetchTemplateDetail();
  }, [templateId]);

  return (
    <div className="item">
      <h4 className="sub-heading mb-3">Personal Detail</h4>
      <p className="form-desc-text mb-7">
        Personal details include name, contact information, identification
        numbers, financial data, health records, and employment specifics,
        crucial for privacy protection.
      </p>
      <div className="grid grid-cols-2 gap-5">
        {selectedTemplate?.isPFPActive && (
          <div className="col-span-2">
            <div className="image">
              <img src={DummyUser} alt="" />
              <div className="actions">
                <button>
                  <FaPlus /> Upload Photo
                </button>
              </div>
            </div>
          </div>
        )}

        <div>
          <FormInput
            label="Job Title"
            name="jobTitle"
            type="text"
            className="mb-0"
            required
            value={formik.values.jobTitle}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.jobTitle && formik.errors.jobTitle}
          />
        </div>

        <div>
          <FormInput
            label="First Name"
            name="firstName"
            type="text"
            className="mb-0"
            required
            value={formik.values.firstName}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
          />
        </div>

        <div>
          <FormInput
            label="Middle Name"
            name="middleName"
            type="text"
            className="mb-0"
            required
            value={formik.values.middleName}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.middleName && formik.errors.middleName}
          />
        </div>

        <div>
          <FormInput
            label="Last Name"
            name="lastName"
            type="text"
            className="mb-0"
            required
            value={formik.values.lastName}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && formik.errors.lastName}
          />
        </div>

        <div>
          <FormInput
            label="Email"
            name="email"
            type="email"
            className="mb-0"
            required
            value={formik.values.email}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />
        </div>

        <div>
          <FormInput
            label="Phone"
            name="phone"
            type="text"
            className="mb-0"
            required
            value={formik.values.phone}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && formik.errors.phone}
          />
        </div>

        <div className="col-span-2">
          <FormText
            label="Summary"
            name="summary"
            required
            className="mb-0"
            value={formik.values.summary}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.summary && formik.errors.summary}
          />
        </div>
      </div>

      <button className="toggle-info-btn" onClick={toggleAdditionalInfo}>
        {showAdditionalInfo ? (
          <>
            Hide Additional Information <MdOutlineKeyboardArrowUp />
          </>
        ) : (
          <>
            Edit Additional Information <MdOutlineKeyboardArrowDown />
          </>
        )}
      </button>

      {showAdditionalInfo && (
        <div className="grid grid-cols-2 gap-5">
          <div>
            <FormInput
              label="Address"
              name="address"
              type="text"
              className="mb-0"
              required
              value={formik.values.address}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && formik.errors.address}
            />
          </div>
          <div>
            <FormInput
              label="City"
              name="city"
              type="text"
              className="mb-0"
              required
              value={formik.values.city}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && formik.errors.city}
            />
          </div>
          <div>
            <FormInput
              label="State"
              name="state"
              type="text"
              className="mb-0"
              required
              value={formik.values.state}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && formik.errors.state}
            />
          </div>
          <div>
            <FormInput
              label="Zip Code"
              name="zip"
              type="text"
              className="mb-0"
              required
              value={formik.values.zip}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.zip && formik.errors.zip}
            />
          </div>
          <div>
            <FormInput
              label="Driving Licenses"
              name="drivingLicense"
              type="text"
              className="mb-0"
              required
              value={formik.values.drivingLicense}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.drivingLicense && formik.errors.drivingLicense
              }
            />
          </div>
          <div>
            <FormInput
              label="Nationality"
              name="nationality"
              type="text"
              className="mb-0"
              required
              value={formik.values.nationality}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nationality && formik.errors.nationality}
            />
          </div>
          <div>
            <FormInput
              label="Place Of Birth"
              name="placeOfBirth"
              type="text"
              className="mb-0"
              required
              value={formik.values.placeOfBirth}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.placeOfBirth && formik.errors.placeOfBirth}
            />
          </div>
          <div>
            <FormInput
              label="Date Of Birth"
              name="dateOfBirth"
              type="date"
              className="mb-0"
              required
              value={formik.values.dateOfBirth}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
            />
          </div>
          <div>
            <FormSelect
              label="Gender"
              name="gender"
              className="mb-0"
              required
              value={formik.values.gender}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gender && formik.errors.gender}
              options={[
                { label: "---", value: "" },
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Others", value: "Others" },
              ]}
            />
          </div>
          <div>
            <FormSelect
              label="Marital Status"
              name="maritalStatus"
              className="mb-0"
              required
              value={formik.values.maritalStatus}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.maritalStatus && formik.errors.maritalStatus
              }
              options={[
                { label: "---", value: "" },
                { label: "Unmarried", value: "Unmarried" },
                { label: "Married", value: "Married" },
                { label: "Divorced", value: "Divorced" },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalDetail;
