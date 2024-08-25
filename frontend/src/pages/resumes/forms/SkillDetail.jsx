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
  setSkills,
  addSkill,
  deleteSkill,
  updateSkill,
} from "../../../store/slices/resumeSlice";
import { FormInput, FormRadioSlide } from "../../../components/index";
import { skillDetailSchema } from "../../../schemas/index";

const SkillDetail = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const { skills: fetchedSkills, detail } = resume;
  const refresh = useRefresh();

  const resumeId = detail.resumeId;

  // Fetch Skills
  const fetchSkills = async (resumeId) => {
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
        }/resume/${resumeId}?action=get-all-skills`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data.skills;
      dispatch(setSkills(data || []));
      formik.setFieldValue("skills", data || []);
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error fetching skills",
          type: "error",
        })
      );
    }
  };
  useEffect(() => {
    if (resumeId) {
      fetchSkills(resumeId);
    }
  }, [resumeId]);

  // Formik
  const formik = useFormik({
    initialValues: {
      skills: fetchedSkills || [],
    },
    validationSchema: skillDetailSchema,
    onSubmit: () => {},
    enableReinitialize: true,
  });
  const { values, handleChange, handleSubmit, setFieldValue } = formik;

  // Update Skills
  const onSubmitHandler = async (itemId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        dispatch(
          showAlert({ message: "Unauthorized: No token found", type: "error" })
        );
        return;
      }

      const skill = values.skills.find((skill) => skill._id === itemId);

      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/resume/${resumeId}?action=update-skill&sid=${itemId}`,
        skill,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;

      dispatch(updateSkill(data));
      dispatch(
        showAlert({ message: "Skill updated successfully", type: "success" })
      );
    } catch (error) {
      dispatch(showAlert({ message: "Error updating skill", type: "error" }));
    }
  };

  // Add Skill
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
        }/resume/${resumeId}?action=add-skill`,
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
      dispatch(addSkill(newData));
      setFieldValue("skills", [...values.skills, newData]);
      dispatch(
        showAlert({ message: "Skills added successfully", type: "success" })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error adding skill",
          type: "error",
        })
      );
    }
  };

  // Handle Delete Skills
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
        }/resume/${resumeId}?action=delete-skill&sid=${itemId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;
      setFieldValue("skills", data);
      dispatch(deleteSkill(data));
      dispatch(
        showAlert({ message: "Skill deleted successfully", type: "success" })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error deleting skill",
          type: "error",
        })
      );
    }
  };

  // Toggle card
  const toggleItemVisibility = (index) => {
    const updatedSkills = values.skills.map((skill, i) => {
      if (i === index) {
        return {
          ...skill,
          isOpen: !skill.isOpen,
        };
      }
      return skill;
    });
    setFieldValue("skills", updatedSkills);
  };

  // Handle Radio Change
  const handleRadioChange = (index, event) => {
    const updatedSkills = values.skills.map((skill, i) => {
      if (i === index) {
        return { ...skill, level: event.target.value };
      }
      return skill;
    });
    setFieldValue("skills", updatedSkills);
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="item">
        <h4 className="sub-heading mb-3">Skills</h4>
        <p className="form-desc-text mb-7">Add a new skill to stand out.</p>

        <FieldArray
          name="skills"
          render={() => (
            <>
              {values.skills.map((item, index) => (
                <div key={index} className="content" data-skill-id={item._id}>
                  {/* Head */}
                  <div className="head">
                    <div className="text">
                      <h5>{item.skill || `Skill Name`}</h5>
                      <h6>
                        <span>{item.level || `Skill Level`}</span>
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
                            name={`skills[${index}].skill`}
                            type="text"
                            className="mb-0"
                            required
                            value={item.skill}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormRadioSlide
                            label="Level"
                            name={`skills[${index}].level`}
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
                        Update Skill
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
          <span className="me-2">Add New Skill</span>
          <FaPlus />
        </button>
      </form>
    </FormikProvider>
  );
};

export default SkillDetail;
