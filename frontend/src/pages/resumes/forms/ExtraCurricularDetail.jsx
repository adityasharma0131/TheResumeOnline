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
  setCurriculars,
  addCurricularDetail,
  deleteCurricularDetail,
  updateCurricularDetail,
} from "../../../store/slices/resumeSlice";
import { FormInput, FormText } from "../../../components/index";
import { curricularDetailSchema } from "../../../schemas/index";

const ExtraCurricularDetail = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const fetchedResumeDetail = resume;
  const refresh = useRefresh();

  const resumeId = fetchedResumeDetail.detail?.resumeId;

  // Fetch Curricular Detail
  const fetchCurricular = async (resumeId) => {
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
        }/resume/${resumeId}?action=get-all-curricular`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data.extraCurricular;

      dispatch(setCurriculars(data || []));
      setFieldValue("extraCurricular", data || []);
    } catch (error) {
      dispatch(
        showAlert({
          message:
            error.response?.data?.message || "Error fetching Extra Curricular",
          type: "error",
        })
      );
    }
  };
  useEffect(() => {
    if (resumeId) {
      fetchCurricular(resumeId);
    }
  }, [resumeId]);

  // Formik
  const formik = useFormik({
    initialValues: {
      extraCurricular: fetchedResumeDetail.extraCurricular || [],
    },
    validationSchema: curricularDetailSchema,
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

      const curricular = values.extraCurricular.find(
        (item) => item._id === itemId
      );

      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/resume/${resumeId}?action=update-curricular&ecid=${itemId}`,
        curricular,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;

      dispatch(updateCurricularDetail(data));
      dispatch(
        showAlert({
          message: "Extra Curricular updated successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({ message: "Error updating extra curricular", type: "error" })
      );
    }
  };

  // Add Curricular
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
        }/resume/${resumeId}?action=add-curricular`,
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
      dispatch(addCurricularDetail(newData));
      setFieldValue("extraCurricular", [...values.extraCurricular, newData]);
      dispatch(
        showAlert({
          message: "Extra Curricular added successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message:
            error.response?.data?.message || "Error Adding Extra Curricular",
          type: "error",
        })
      );
    }
  };

  // Delete Curricular
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
        }/resume/${resumeId}?action=delete-curricular&ecid=${itemId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;

      setFieldValue("extraCurricular", data);
      dispatch(deleteCurricularDetail(data));
      dispatch(
        showAlert({
          message: "Extra Curricular deleted successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message:
            error.response?.data?.message || "Error Deleting Extra Curricular",
          type: "error",
        })
      );
    }
  };

  // Toggle Card
  const toggleItemVisibility = (index) => {
    const updatedCurricular = values.extraCurricular.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          isOpen: !item.isOpen,
        };
      }
      return item;
    });
    setFieldValue("extraCurricular", updatedCurricular);
    refresh();
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="item">
        <h4 className="sub-heading mb-3">Extra Curricular</h4>
        <p className="form-desc-text mb-7">
          Extracurricular activities on a resume refer to interests and
          involvements outside of academic or professional pursuits, showcasing
          additional skills, experiences, or passions.
        </p>

        <FieldArray
          name="extraCurricular"
          render={() => (
            <>
              {values.extraCurricular.map((item, index) => (
                <div
                  key={index}
                  className="content"
                  data-education-id={item._id}
                >
                  {/* Head */}
                  <div className="head">
                    <div className="text">
                      <h5>{item.title || `Title`}</h5>
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
                        <div>
                          <FormInput
                            label="Title"
                            name={`extraCurricular[${index}].title`}
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
                            name={`extraCurricular[${index}].employer`}
                            type="text"
                            className="mb-0"
                            required
                            value={item.employer}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormInput
                            label="Start Date"
                            name={`extraCurricular[${index}].startDate`}
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
                            name={`extraCurricular[${index}].endDate`}
                            type="date"
                            className="mb-0"
                            required
                            value={formatDate(item.endDate)}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormInput
                            label="city"
                            name={`extraCurricular[${index}].city`}
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
                            name={`extraCurricular[${index}].description`}
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
                        Update Curricular
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
          <span className="me-2">Add New Curricular</span>
          <FaPlus />
        </button>
      </form>
    </FormikProvider>
  );
};

export default ExtraCurricularDetail;
