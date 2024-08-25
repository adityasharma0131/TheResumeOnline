import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import imageMap from "../resumes/template-images";
import { showAlert } from "../../store/slices/alertSlice";
import { changeResumeTemplate } from "../../store/slices/resumeSlice";
import { setCurrentTemplate } from "../../store/slices/templateSlice";

const ResumeSelectTemplate = ({ templates }) => {
  const dispatch = useDispatch();

  const resume = useSelector((state) => state.resume);
  const fetchedResumeDetail = resume;

  const resumeId = fetchedResumeDetail.detail?.resumeId;

  // Change Resume Template
  const changeTemplateHandler = async (tempId) => {
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
        }/resume/${resumeId}/change-template`,
        { templateId: tempId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data.template;
      dispatch(changeResumeTemplate(data));

      dispatch(setCurrentTemplate());
      const resetSpecificHeadStyles = () => {
        const styles = document.head.querySelectorAll(
          "style[data-vite-dev-id]"
        );

        // Filter and remove styles that include 'pages/resumes/templates' in the path
        styles.forEach((style) => {
          const devId = style.getAttribute("data-vite-dev-id");
          if (devId && devId.includes("pages/resumes/templates")) {
            style.parentNode.removeChild(style);
          }
        });
      };
      resetSpecificHeadStyles();
      dispatch(setCurrentTemplate(data));
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error fetching templates",
          type: "error",
        })
      );
    }
  };

  return (
    <>
      <div className="resume-head">
        <h4 className="mt-5 heading">Select Template</h4>
        <p className="mt-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure dolore
          reiciendis mollitia impedit et doloribus.
        </p>
      </div>

      <hr />

      <div className="resume-select-template">
        <ul className="grid grid-cols-3 gap-3">
          {templates.map((template, index) => (
            <li className="col" key={index}>
              <div
                className={`template-card ${
                  resume.detail.templateId === template._id ? "active" : ""
                }`}
              >
                <div className="action">
                  <button
                    className="button"
                    onClick={() => changeTemplateHandler(template._id)}
                  >
                    {resume.detail.templateId === template._id
                      ? "Selected"
                      : "Select"}
                  </button>
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
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ResumeSelectTemplate;
