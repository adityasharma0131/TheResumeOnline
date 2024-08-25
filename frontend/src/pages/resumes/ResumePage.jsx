import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoEyeOutline, IoGridOutline } from "react-icons/io5";

import { ResumeForm, ResumeOutput, ResumeSelectTemplate } from "./index";
import {
  resetResumeState,
  setCurrentResume,
  updatePersonalDetail,
} from "../../store/slices/resumeSlice";
import { showAlert } from "../../store/slices/alertSlice";

const ResumePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [outputVisibility, setOutputVisibility] = useState(false);
  const [changeTemplate, setChangeTemplate] = useState(false);

  const resume = useSelector((state) => state.resume.detail);
  const templates = useSelector((state) => state.template.templates);
  const resumeId = resume.resumeId;

  // Go Back Button
  const goBackHandler = () => {
    dispatch(resetResumeState());
    navigate("/dashboard/resumes");
  };

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        dispatch(
          showAlert({ message: "Unauthorized: No token found", type: "error" })
        );
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/resume/${resumeId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const currentResume = response.data.data;
        dispatch(
          setCurrentResume({
            templateId: currentResume.template,
            resumeId: currentResume._id,
            user: currentResume.user,
          })
        );
        dispatch(updatePersonalDetail(currentResume.personalDetail));
      } catch (error) {
        dispatch(
          showAlert({
            message: `Error fetching resume :: ${error}`,
            type: "error",
          })
        );
      }
    };
    fetchData();
  }, [dispatch, resumeId]);

  // Displat output
  const handleDisplatOutput = () => {
    setOutputVisibility(!outputVisibility);
  };

  // Change Template
  const handleChangeTemplate = () => {
    setChangeTemplate(!changeTemplate);
  };

  return (
    <>
      <div className="resume-container">
        <button
          to="/dashboard/resumes"
          className="go-back-btn"
          onClick={goBackHandler}
        >
          <IoIosArrowRoundBack />
          <span>Go Back</span>
        </button>
        <div className="resume-actions">
          <button className="temp-btn" onClick={handleChangeTemplate}>
            <IoGridOutline />
            <span>Change Templates</span>
          </button>
          <button className="preview-btn" onClick={handleDisplatOutput}>
            <IoEyeOutline />
            <span>Preview</span>
          </button>
        </div>
        <div className="resume-form">
          {!changeTemplate && (
            <ResumeForm resume={resume} templates={templates} />
          )}
          {changeTemplate && <ResumeSelectTemplate templates={templates} />}
        </div>
        <div className={`resume-overview ${outputVisibility && "show"}`}>
          <ResumeOutput />
        </div>
      </div>
    </>
  );
};

export default ResumePage;
