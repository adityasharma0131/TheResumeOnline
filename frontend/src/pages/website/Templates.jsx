import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Breadcrumb } from "../../components";
import { setTemplates } from "../../store/slices/templateSlice";
import { addResume, createResume } from "../../store/slices/resumeSlice";
import { showAlert } from "../../store/slices/alertSlice";
import imageMap from "../resumes/template-images";

const Templates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const templates = useSelector((state) => state.template.templates);

  const fetchTemplates = async () => {
    // Fetch Templates
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/template`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data.data;
    dispatch(setTemplates(data));
  };

  // Create Resume
  const handleCreateResume = async (tempId) => {
    try {
      const templateId = tempId;
      const fetchUrl = `${
        import.meta.env.VITE_API_BASE_URL
      }/resume/?templateId=${templateId}`;

      const response = await axios.post(
        fetchUrl,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const createdResume = response.data.data;
      dispatch(addResume(createdResume));
      dispatch(
        createResume({
          templateId: createdResume.template,
          resumeId: createdResume._id,
          user: createdResume.user,
        })
      );
      navigate(`/resumes/create/${createdResume._id}`);
    } catch (error) {
      dispatch(showAlert({ message: "Error creating resume", type: "error" }));
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Template Section */}
      <section className="section template-list">
        <div className="container">
          <div className="text-center">
            <h4 className="heading text-primary mb-6">
              Create Your Perfect Resume Effortlessly!
            </h4>
            <p className="sub-heading">
              With our Online resume builder, craft a professional and polished
              resume easily. <br /> Ideal for the efficient job seeker who
              values simplicity and professionalism.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            {templates.map((template, index) => (
              <div className="col" key={index}>
                <div className="template-card">
                  <div className="action">
                    {isAuthenticated ? (
                      <button
                        onClick={() => handleCreateResume(template._id)}
                        className="button"
                      >
                        Use This Template
                      </button>
                    ) : (
                      <Link to="/login" className="button">
                        Use This Template
                      </Link>
                    )}
                  </div>
                  <div className="image">
                    <img
                      src={
                        imageMap[template.file.replace(".", "-").toLowerCase()]
                      }
                      alt={template.file}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Templates;
