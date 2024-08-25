import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

import { showAlert } from "../../store/slices/alertSlice";
import {
  addResume,
  removeResume,
  setCurrentResume,
  resetResume,
} from "../../store/slices/resumeSlice";
import { setTemplates } from "../../store/slices/templateSlice";
import imageMap from "../resumes/template-images";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const templates = useSelector((state) => state.template.templates);
  const resumeTemplates = useSelector((state) => state.resume.resumes);

  const fetchTemplates = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      dispatch(
        showAlert({ message: "Unauthorized: No token found", type: "error" })
      );
      return;
    }

    // Fetch Templates
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/template`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const data = response.data.data;

    dispatch(setTemplates(data));
  };

  const fetchResumes = async () => {
    try {
      dispatch(resetResume());

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/resume`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const resumes = response.data.data;
      resumes.forEach((resume) => {
        dispatch(addResume(resume));
      });
    } catch (error) {
      dispatch(showAlert({ message: "Error fetching resumes", type: "error" }));
    }
  };

  useEffect(() => {
    fetchTemplates();
    fetchResumes();
  }, []);

  // Edit Resume
  const handleEditResume = async (resumeId) => {
    dispatch(
      setCurrentResume({
        templateId: resumeId.template,
        resumeId: resumeId._id,
        user: resumeId.user,
      })
    );
    navigate(`/resumes/create/${resumeId._id}`);
  };

  // Delete Resume
  const handleDeleteResume = async (resumeId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/resume/${resumeId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(removeResume(resumeId));
      dispatch(showAlert({ message: "Resume Deleted", type: "success" }));
    } catch (error) {
      console.error("Error deleting resume:", error);
      dispatch(showAlert({ message: "Error deleting resume", type: "error" }));
    }
  };

  return (
    <>
      {/* Grid */}
      <div className="db-temp-grid">
        <div className="grid grid-cols-4 gap-5">
          {resumeTemplates.map((resume, index) => (
            <div className="col" key={index}>
              {templates
                .filter((template) => resume.template === template._id)
                .map((template, index) => (
                  <div className="template-card" key={index}>
                    <div className="action">
                      <button
                        className="button edit-btn"
                        onClick={() => handleEditResume(resume)}
                      >
                        <MdOutlineEdit />
                      </button>
                      <button
                        className="button delete-btn"
                        onClick={() => handleDeleteResume(resume._id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    <div className="image">
                      <img
                        src={
                          imageMap[
                            template.file.replace(".", "-").toLowerCase()
                          ]
                        }
                        alt={template.file}
                      />
                    </div>
                  </div>
                ))}
            </div>
          ))}

          <div className="col">
            <Link className="create-resume-btn" to="/templates">
              <span>Create Resume</span>
              <div className="icon">
                <FaPlus />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
