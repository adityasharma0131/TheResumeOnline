import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { useFormik, FieldArray, FormikProvider } from "formik";

import useRefresh from "../../../utils/useRefresh";
import { showAlert } from "../../../store/slices/alertSlice";
import {
  setLanguages,
  addLanguage,
  deleteLanguage,
  updateLanguage,
} from "../../../store/slices/resumeSlice";
import { FormInput, FormRadioSlide } from "../../../components/index";
import { languageDetailSchema } from "../../../schemas/index";

const LanguageDetail = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const { languages: fetchedLanguages, detail } = resume;
  const refresh = useRefresh();

  const resumeId = detail.resumeId;

  // Fetch Languages
  const fetchLanguages = async (resumeId) => {
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
        }/resume/${resumeId}?action=get-all-languages`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data.languages;
      dispatch(setLanguages(data || []));
      formik.setFieldValue("languages", data || []);
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error fetching Languages",
          type: "error",
        })
      );
    }
  };
  useEffect(() => {
    if (resumeId) {
      fetchLanguages(resumeId);
    }
  }, [resumeId]);

  // Formik
  const formik = useFormik({
    initialValues: {
      languages: fetchedLanguages || [],
    },
    validationSchema: languageDetailSchema,
    onSubmit: () => {},
    enableReinitialize: true,
  });
  const { values, handleChange, handleSubmit, setFieldValue } = formik;

  // Update Language
  const onSubmitHandler = async (itemId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        dispatch(
          showAlert({ message: "Unauthorized: No token found", type: "error" })
        );
        return;
      }

      const language = values.languages.find(
        (language) => language._id === itemId
      );

      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/resume/${resumeId}?action=update-language&laid=${itemId}`,
        language,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;
      dispatch(updateLanguage(data));
      dispatch(
        showAlert({ message: "Language updated successfully", type: "success" })
      );
    } catch (error) {
      dispatch(
        showAlert({ message: "Error updating language", type: "error" })
      );
    }
  };

  // Add Language
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
        }/resume/${resumeId}?action=add-language`,
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
      dispatch(addLanguage(newData));
      setFieldValue("languages", [...values.languages, newData]);

      dispatch(
        showAlert({ message: "Language added successfully", type: "success" })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error adding language",
          type: "error",
        })
      );
    }
  };

  // Delete Language
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
        }/resume/${resumeId}?action=delete-language&laid=${itemId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;
      setFieldValue("language", data);
      dispatch(deleteLanguage(data));
      dispatch(
        showAlert({ message: "Language deleted successfully", type: "success" })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error deleting language",
          type: "error",
        })
      );
    }
  };

  // Toggle Card
  const toggleItemVisibility = (index) => {
    const updatedLanguages = values.languages.map((language, i) => {
      if (i === index) {
        return {
          ...language,
          isOpen: !language.isOpen,
        };
      }
      return language;
    });
    setFieldValue("languages", updatedLanguages);
  };

  // Handle Radio Change
  const handleRadioChange = (index, event) => {
    const updatedLanguages = values.languages.map((language, i) => {
      if (i === index) {
        return { ...language, level: event.target.value };
      }
      return language;
    });
    setFieldValue("languages", updatedLanguages);
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="item">
        <h4 className="sub-heading mb-3">Language</h4>
        <p className="form-desc-text mb-7">Add Languages that you know </p>

        <FieldArray
          name="languages"
          render={() => (
            <>
              {values.languages.map((item, index) => (
                <div
                  key={index}
                  className="content"
                  data-language-id={item._id}
                >
                  {/* Head */}
                  <div className="head">
                    <div className="text">
                      <h5>{item.label || `Language Name`}</h5>
                      <h6>
                        <span>{item.level || `Language Level`}</span>
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
                            label="Label"
                            name={`languages[${index}].label`}
                            type="text"
                            className="mb-0"
                            required
                            value={item.language}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormRadioSlide
                            label="Level"
                            name={`languages[${index}].level`}
                            options={[
                              { value: 1, label: "Very Bad" },
                              { value: 2, label: "Bad" },
                              { value: 3, label: "Neutral" },
                              { value: 4, label: "Good" },
                              { value: 5, label: "Very Good" },
                            ]}
                            value={item.level}
                            onChange={(event) =>
                              handleRadioChange(index, event)
                            }
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="button-sm mt-3"
                        onClick={() => onSubmitHandler(item._id)}
                      >
                        Update Language
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
          <span className="me-2">Add New Language</span>
          <FaPlus />
        </button>
      </form>
    </FormikProvider>
  );
};

export default LanguageDetail;
