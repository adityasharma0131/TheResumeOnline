import {
  CourseDetail,
  CustomSectionDetail,
  EducationDetail,
  ExtraCurricularDetail,
  HobbieDetail,
  InternshipDetail,
  LanguageDetail,
  LinkDetails,
  PersonalDetail,
  ProfessionalDetail,
  ReferenceDetail,
  SkillDetail,
} from "./forms";

const ResumeForm = ({ resume, templates }) => {
  const matchingTemplate = templates.find(
    (template) => template._id === resume.templateId
  );

  const resumeName = `${matchingTemplate.type} ${matchingTemplate.name} Template`;

  return (
    <>
      <div className="resume-head">
        <h4 className="mt-5 heading">{resumeName}</h4>
        {matchingTemplate.description && (
          <p className="mt-5">{matchingTemplate.description}</p>
        )}
      </div>

      <hr />
      <PersonalDetail />
      <hr />
      <ProfessionalDetail />
      <hr />
      <EducationDetail />
      <hr />
      <LinkDetails />
      <hr />
      <SkillDetail />
      <hr />
      <LanguageDetail />
      <hr />
      <CourseDetail />
      <hr />
      <InternshipDetail />
      <hr />
      <HobbieDetail />
      <hr />
      <ReferenceDetail />
      <hr />
      <ExtraCurricularDetail />
      <hr />
      <CustomSectionDetail />
    </>
  );
};

export default ResumeForm;
