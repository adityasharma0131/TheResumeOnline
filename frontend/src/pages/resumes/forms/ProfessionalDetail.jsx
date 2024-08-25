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
  setProfessions,
  addProfessionalDetail,
  deleteProfessionalDetail,
  updateProfessionalDetail,
} from "../../../store/slices/resumeSlice";
import { FormInput, FormText, FormCheck } from "../../../components/index";
import { professionalDetailSchema } from "../../../schemas/index";

const ProfessionalDetail = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const fetchedResumeDetail = resume;
  const refresh = useRefresh();

  const resumeId = fetchedResumeDetail.detail.resumeId;

  // Fetch Professions
  const fetchProfessions = async (resumeId) => {
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
        }/resume/${resumeId}?action=get-all-profession`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data.professions;
      dispatch(setProfessions(data || []));
      setFieldValue("professions", data || []);
    } catch (error) {
      dispatch(
        showAlert({
          message:
            error.response?.data?.message || "Error fetching professions",
          type: "error",
        })
      );
    }
  };
  useEffect(() => {
    if (resumeId) {
      fetchProfessions(resumeId);
    }
  }, [resumeId]);

  // Formik
  const formik = useFormik({
    initialValues: {
      professions: fetchedResumeDetail.professions || [],
    },
    validationSchema: professionalDetailSchema,
    onSubmit: () => {},
    enableReinitialize: true,
  });
  const { values, handleChange, handleSubmit, setFieldValue } = formik;

  // On Submit Function
  const onSubmitHandler = async (professionId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        dispatch(
          showAlert({ message: "Unauthorized: No token found", type: "error" })
        );
        return;
      }

      const profession = values.professions.find(
        (profession) => profession._id === professionId
      );

      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/resume/${resumeId}?action=update-profession&pid=${professionId}`,
        profession,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;
      dispatch(updateProfessionalDetail(data));
      dispatch(
        showAlert({
          message: "Profession updated successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({ message: "Error updating profession", type: "error" })
      );
    }
  };

  // Add Experience
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
        }/resume/${resumeId}?action=add-profession`,
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
      dispatch(addProfessionalDetail(newData));
      setFieldValue("professions", [...values.professions, data]);
      dispatch(
        showAlert({ message: "Profession added successfully", type: "success" })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error Adding Experience",
          type: "error",
        })
      );
    }
  };

  // Delete Experience Card
  const handleDeleteItem = async (professionId) => {
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
        }/resume/${resumeId}?action=delete-profession&pid=${professionId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;

      setFieldValue("professions", data);
      dispatch(deleteProfessionalDetail(data));
      dispatch(
        showAlert({
          message: "Profession deleted successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error Deleting Experience",
          type: "error",
        })
      );
    }
  };

  // Toggle Experience Card
  const toggleExperienceVisibility = (index) => {
    const updatedProfessions = values.professions.map((profession, i) => {
      if (i === index) {
        return {
          ...profession,
          isOpen: !profession.isOpen,
        };
      }
      return profession;
    });
    setFieldValue("professions", updatedProfessions);
    refresh();
  };

  // Checkbox Change
  const handleCheckboxChange = (professionId) => {
    const updatedProfessions = values.professions.map((profession) => {
      if (profession._id === professionId) {
        return {
          ...profession,
          currentlyWorking: !profession.currentlyWorking,
        };
      }
      return profession;
    });
    setFieldValue("professions", updatedProfessions);
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="item">
        <h4 className="sub-heading mb-3">Employment History</h4>
        <p className="form-desc-text mb-7">
          List of all the jobs you had, including where you worked, when you
          worked there, and what you did
        </p>

        <FieldArray
          name="professions"
          render={() => (
            <>
              {values.professions.map((profession, index) => (
                <div
                  key={index}
                  className="content"
                  data-profession-id={profession._id}
                >
                  <div className="head">
                    <div className="text">
                      <h5>{profession.title || `Job Title`}</h5>
                      <h6>
                        <span>
                          {formatDate(profession.startDate) || `Start Date`}
                        </span>
                        <span>-</span>
                        <span>
                          {profession.currentlyWorking
                            ? "Present"
                            : formatDate(profession.endDate) || `End Date`}
                        </span>
                      </h6>
                    </div>
                    <div className="action">
                      <button
                        type="button"
                        className="collapse-btn"
                        onClick={() => toggleExperienceVisibility(index)}
                      >
                        <IoIosArrowDown />
                      </button>
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => handleDeleteItem(profession._id)}
                      >
                        <GoTrash />
                      </button>
                    </div>
                  </div>
                  {profession.isOpen && (
                    <div className="body">
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <FormInput
                            label="Job Title"
                            name={`professions[${index}].title`}
                            type="text"
                            className="mb-0"
                            required
                            value={profession.title}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormInput
                            label="Employer"
                            name={`professions[${index}].employer`}
                            type="text"
                            className="mb-0"
                            required
                            value={profession.employer}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-span-2">
                          <FormCheck
                            className="mb-0"
                            label="Currently working in this company"
                            name={`professions[${index}].currentlyWorking`}
                            checked={profession.currentlyWorking}
                            onChange={() =>
                              handleCheckboxChange(profession._id)
                            }
                          />
                        </div>
                        <div>
                          <FormInput
                            label="Start Date"
                            name={`professions[${index}].startDate`}
                            type="date"
                            className="mb-0"
                            required
                            value={formatDate(profession.startDate)}
                            onChange={handleChange}
                          />
                        </div>
                        {!profession.currentlyWorking && (
                          <div>
                            <FormInput
                              label="End Date"
                              name={`professions[${index}].endDate`}
                              type="date"
                              className="mb-0"
                              required
                              value={formatDate(profession.endDate)}
                              onChange={handleChange}
                            />
                          </div>
                        )}
                        <div>
                          <FormInput
                            label="City"
                            name={`professions[${index}].city`}
                            type="text"
                            className="mb-0"
                            required
                            value={profession.city}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-span-2">
                          <FormText
                            label="Description"
                            name={`professions[${index}].description`}
                            rows="4"
                            className="mb-0"
                            required
                            value={profession.description}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="button-sm mt-3"
                        onClick={() => onSubmitHandler(profession._id)}
                      >
                        Update Experience
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
          <span className="me-2">Add New Experience</span>
          <FaPlus />
        </button>
      </form>
    </FormikProvider>
  );
};

export default ProfessionalDetail;
