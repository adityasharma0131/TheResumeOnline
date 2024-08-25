import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { TemplateRenderer } from "./index";

const ResumeOutput = () => {
  const navigate = useNavigate();
  const resume = useSelector((state) => state.resume);

  useEffect(() => {
    if (!resume) {
      navigate("/dashboard");
    }
  }, [resume, navigate]);

  if (!resume) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TemplateRenderer templateId={resume.detail.templateId} resume={resume} />
    </>
  );
};

export default ResumeOutput;
