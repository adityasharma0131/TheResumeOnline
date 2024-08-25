import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { useFormik, FieldArray, FormikProvider } from "formik";

import formatDate from "../../../utils/dateFormator";
import useRefresh from "../../../utils/useRefresh";
import { showAlert } from "../../../store/slices/alertSlice";
import {
  setCustomSections,
  addCustomSection,
  deleteCustomSection,
  updateCustomSection,
} from "../../../store/slices/resumeSlice";
import { FormInput, FormText } from "../../../components/index";
import { customSectionDetailSchema } from "../../../schemas/index";

const CustomSectionDetail = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const fetchedResumeDetail = resume;
  const refresh = useRefresh();

  const resumeId = fetchedResumeDetail.detail?.resumeId;

  // Fetch Sections
  const fetchCustomSection = async (resumeId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      dispatch(
        showAlert({ message: "Unauthorized: No token found", type: "error" })
      );
      return;
    }

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/resume/${resumeId}?action=get-all-custom-sections`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data.customSections;
      dispatch(setCustomSections(data || []));
      setFieldValue("customSections", data || []);
    } catch (error) {
      dispatch(
        showAlert({
          message:
            error.response?.data?.message || "Error fetching custom section",
          type: "error",
        })
      );
    }
  };
  useEffect(() => {
    if (resumeId) {
      fetchCustomSection(resumeId);
    }
  }, [resumeId]);

  // Formik
  const formik = useFormik({
    initialValues: {
      customSections: fetchedResumeDetail.customSections || [],
    },
    validationSchema: customSectionDetailSchema,
    onSubmit: () => {},
    enableReinitialize: true,
  });
  const { values, handleChange, handleSubmit, setFieldValue } = formik;

  // On Submit Function
  const onSubmitHandler = async (itemId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        dispatch(
          showAlert({ message: "Unauthorized: No token found", type: "error" })
        );
        return;
      }

      const customSection = values.customSections.find(
        (item) => item._id === itemId
      );

      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/resume/${resumeId}?action=update-custom-section&csid=${itemId}`,
        customSection,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;

      dispatch(updateCustomSection(data));
      dispatch(
        showAlert({
          message: "Custom Section updated successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({ message: "Error updating custom section", type: "error" })
      );
    }
  };

  // Add Section
  const handleAddItem = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      dispatch(
        showAlert({ message: "Unauthorized: No token found", type: "error" })
      );
      return;
    }

    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/resume/${resumeId}?action=add-custom-section`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;
      const newData = { ...data, isOpen: true };

      dispatch(addCustomSection(newData));
      setFieldValue("customSections", [...values.customSections, newData]);
      dispatch(
        showAlert({
          message: "Custom Section added successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message:
            error.response?.data?.message || "Error Adding custom section",
          type: "error",
        })
      );
    }
  };

  // Delete Section
  const handleDeleteItem = async (itemId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      dispatch(
        showAlert({ message: "Unauthorized: No token found", type: "error" })
      );
      return;
    }

    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/resume/${resumeId}?action=delete-custom-section&csid=${itemId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setFieldValue("customSections", data);
      dispatch(deleteCustomSection(data));
      dispatch(
        showAlert({
          message: "Custom Section deleted successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message:
            error.response?.data?.message || "Error Deleting Custom Section",
          type: "error",
        })
      );
    }
  };

  // Toggle Card
  const toggleItemVisibility = (index) => {
    const updatedCustomSection = values.customSections.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          isOpen: !item.isOpen,
        };
      }
      return item;
    });
    setFieldValue("customSections", updatedCustomSection);
    refresh();
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="item">
        <h4 className="sub-heading mb-3">Custom Section</h4>
        <p className="form-desc-text mb-7">Add any custom section if needed </p>

        <FieldArray
          name="customSections"
          render={() => (
            <>
              {values.customSections.map((item, index) => (
                <div
                  key={index}
                  className="content"
                  data-custom-section-id={item._id}
                >
                  {/* Head */}
                  <div className="head">
                    <div className="text">
                      <h5>{item.title || `Section Title`}</h5>
                      <h6>
                        <span>
                          {formatDate(item.startDate) || `Start Date`}
                        </span>
                        <span>-</span>
                        <span>{formatDate(item.endDate) || `End Date`}</span>
                      </h6>
                    </div>
                    <div className="action">
                      <button
                        type="button"
                        className="collapse-btn"
                        onClick={() => toggleItemVisibility(index)}
                      >
                        <IoIosArrowDown />
                      </button>
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        <GoTrash />
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  {item.isOpen && (
                    <div className="body">
                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-2">
                          <FormInput
                            label="Title"
                            name={`customSections[${index}].title`}
                            type="text"
                            className="mb-0"
                            required
                            value={item.title}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormInput
                            label="Start Date"
                            name={`customSections[${index}].startDate`}
                            type="date"
                            className="mb-0"
                            required
                            value={formatDate(item.startDate)}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormInput
                            label="End Date"
                            name={`customSections[${index}].endDate`}
                            type="date"
                            className="mb-0"
                            required
                            value={formatDate(item.endDate)}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-span-2">
                          <FormInput
                            label="city"
                            name={`customSections[${index}].city`}
                            type="text"
                            className="mb-0"
                            required
                            value={item.city}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-span-2">
                          <FormText
                            label="Description"
                            name={`customSections[${index}].description`}
                            rows="4"
                            className="mb-0"
                            required
                            value={item.description}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="button-sm mt-3"
                        onClick={() => onSubmitHandler(item._id)}
                      >
                        Update Section
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        />

        <button
          type="button"
          className="toggle-info-btn"
          onClick={handleAddItem}
        >
          <span className="me-2">Add New Section</span>
          <FaPlus />
        </button>
      </form>
    </FormikProvider>
  );
};

export default CustomSectionDetail;
