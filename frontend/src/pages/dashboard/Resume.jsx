import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineEdit } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

import {
  addResume,
  removeResume,
  setCurrentResume,
  resetResume,
} from "../../store/slices/resumeSlice";
import { showAlert } from "../../store/slices/alertSlice";
import imageMap from "../resumes/template-images";

const Resume = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allResumes = useSelector((state) => state.resume.resumes);
  const templates = useSelector((state) => state.template.templates);

  // Fetch data on Load
  useEffect(() => {
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
        dispatch(
          showAlert({ message: "Error fetching resumes", type: "error" })
        );
      }
    };

    if (allResumes.length === 0) {
      fetchResumes();
    }
  }, [dispatch, allResumes]);

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
      <h1 className="sub-heading mb-5">My Resumes ({allResumes.length})</h1>

      <ul className="grid grid-cols-4 gap-5">
        {allResumes.length === 0 ? (
          <div className="col-span-4">
            <p className="sub-heading text-danger">No resumes created!</p>
          </div>
        ) : (
          <>
            {allResumes.map((resume) => (
              <li key={resume._id}>
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
              </li>
            ))}
          </>
        )}

        <li>
          <Link className="create-resume-btn" to="/templates">
            <span>Create Resume</span>
            <div className="icon">
              <FaPlus />
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Resume;
