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
  setInternships,
  addInternshipDetail,
  updateInternshipDetail,
  deleteInternshipDetail,
} from "../../../store/slices/resumeSlice";
import { FormInput, FormText, FormCheck } from "../../../components/index";
import { internshipDetailSchema } from "../../../schemas/index";

const InternshipDetail = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const fetchedResumeDetail = resume;
  const refresh = useRefresh();

  const resumeId = fetchedResumeDetail.detail?.resumeId;

  // Fetch Internships
  const fetchInternships = async (resumeId) => {
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
        }/resume/${resumeId}?action=get-all-internship`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data.internships;

      dispatch(setInternships(data || []));
      setFieldValue("internships", data || []);
    } catch (error) {
      dispatch(
        showAlert({
          message:
            error.response?.data?.message || "Error fetching internships",
          type: "error",
        })
      );
    }
  };
  useEffect(() => {
    if (resumeId) {
      fetchInternships(resumeId);
    }
  }, [resumeId]);

  // Formik
  const formik = useFormik({
    initialValues: {
      internship: fetchedResumeDetail.internship || [],
    },
    validationSchema: internshipDetailSchema,
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

      const internship = values.internship.find((item) => item._id === itemId);

      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/resume/${resumeId}?action=update-internship&iid=${itemId}`,
        internship,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;

      dispatch(updateInternshipDetail(data));
      dispatch(
        showAlert({
          message: "Internship updated successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({ message: "Error updating internship", type: "error" })
      );
    }
  };

  // Add Internship
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
        }/resume/${resumeId}?action=add-internship`,
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

      dispatch(addInternshipDetail(newData));
      setFieldValue("internship", [...values.internship, newData]);
      dispatch(
        showAlert({ message: "Internship added successfully", type: "success" })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error Adding Internship",
          type: "error",
        })
      );
    }
  };

  // Delete Internship
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
        }/resume/${resumeId}?action=delete-internship&iid=${itemId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setFieldValue("internship", data);
      dispatch(deleteInternshipDetail(data));
      dispatch(
        showAlert({
          message: "Internship deleted successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error Deleting Internship",
          type: "error",
        })
      );
    }
  };

  // Toggle card
  const toggleItemVisibility = (index) => {
    const updatedInternship = values.internship.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          isOpen: !item.isOpen,
        };
      }
      return item;
    });
    setFieldValue("internship", updatedInternship);
    refresh();
  };

  // Checkbox Change
  const handleCheckboxChange = (itemId) => {
    const updatedInternship = values.internship.map((item) => {
      if (item._id === itemId) {
        return {
          ...item,
          currentlyStudying: !item.currentlyStudying,
        };
      }
      return item;
    });
    setFieldValue("internship", updatedInternship);
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="item">
        <h4 className="sub-heading mb-3">Internship History</h4>
        <p className="form-desc-text mb-7">Add Internship details </p>

        <FieldArray
          name="internship"
          render={() => (
            <>
              {values.internship.map((item, index) => (
                <div
                  key={index}
                  className="content"
                  data-internship-id={item._id}
                >
                  {/* Head */}
                  <div className="head">
                    <div className="text">
                      <h5>{item.title || `Company Name`}</h5>
                      <h6>
                        <span>
                          {formatDate(item.startDate) || `Start Date`}
                        </span>
                        <span>-</span>
                        <span>
                          {item.currentlyWorking
                            ? "Present"
                            : formatDate(item.endDate) || `End Date`}
                        </span>
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
                        <div>
                          <FormInput
                            label="Role"
                            name={`internship[${index}].title`}
                            type="text"
                            className="mb-0"
                            required
                            value={item.title}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormInput
                            label="Employer"
                            name={`internship[${index}].employer`}
                            type="text"
                            className="mb-0"
                            required
                            value={item.employer}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-span-2">
                          <FormCheck
                            className="mb-0"
                            label="Currently working in this company"
                            name={`internship[${index}].currentlyStudying`}
                            checked={item.currentlyStudying}
                            onChange={() => {
                              handleCheckboxChange(item._id);
                            }}
                          />
                        </div>
                        <div>
                          <FormInput
                            label="Start Date"
                            name={`internship[${index}].startDate`}
                            type="date"
                            className="mb-0"
                            required
                            value={formatDate(item.startDate)}
                            onChange={handleChange}
                          />
                        </div>
                        {!item.currentlyStudying && (
                          <div>
                            <FormInput
                              label="End Date"
                              name={`internship[${index}].endDate`}
                              type="date"
                              className="mb-0"
                              required
                              value={formatDate(item.endDate)}
                              onChange={handleChange}
                            />
                          </div>
                        )}
                        <div>
                          <FormInput
                            label="city"
                            name={`internship[${index}].city`}
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
                            name={`internship[${index}].description`}
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
                        Update Internship
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
          <span className="me-2">Add New Internship</span>
          <FaPlus />
        </button>
      </form>
    </FormikProvider>
  );
};

export default InternshipDetail;
