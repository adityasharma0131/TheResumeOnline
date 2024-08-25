import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumes: [],
  detail: {
    templateId: "",
    resumeId: "",
    user: "",
  },
  personalDetail: {
    jobTitle: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    drivingLicense: "",
    nationality: "",
    placeOfBirth: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    summary: "",
    photo: "",
  },
  professions: [
    {
      _id: "",
      title: "",
      employer: "",
      startDate: "",
      endDate: "",
      city: "",
      description: "",
    },
  ],
  educations: [
    {
      _id: "",
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      city: "",
      description: "",
    },
  ],
  links: [
    {
      _id: "",
      label: "",
      link: "",
    },
  ],
  skills: [
    {
      _id: "",
      skill: "",
      level: "",
    },
  ],
  languages: [
    {
      _id: "",
      label: "",
      level: "",
    },
  ],
  courses: [
    {
      _id: "",
      title: "",
      institute: "",
      startDate: "",
      endDate: "",
      city: "",
      description: "",
    },
  ],
  internship: [
    {
      _id: "",
      title: "",
      employer: "",
      startDate: "",
      endDate: "",
      city: "",
      description: "",
    },
  ],
  hobbies: [
    {
      _id: "",
      label: "",
    },
  ],
  references: [
    {
      _id: "",
      referenceFullname: "",
      company: "",
      phone: "",
      email: "",
    },
  ],
  extraCurricular: [
    {
      _id: "",
      title: "",
      employer: "",
      startDate: "",
      endDate: "",
      city: "",
      description: "",
    },
  ],
  customSections: [
    {
      _id: "",
      title: "",
      startDate: "",
      endDate: "",
      city: "",
      description: "",
    },
  ],
  error: null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    resetResume: () => initialState,

    addResume: (state, action) => {
      state.resumes.push(action.payload);
    },
    createResume: (state, action) => {
      state.detail = action.payload;
    },
    removeResume: (state, action) => {
      state.resumes = state.resumes.filter(
        (resume) => resume._id !== action.payload
      );
    },
    changeResumeTemplate: (state, action) => {
      state.detail.templateId = action.payload;
    },

    setCurrentResume: (state, action) => {
      state.detail = action.payload;
    },
    resetResumeState: () => {
      return initialState;
    },

    updatePersonalDetail: (state, action) => {
      state.personalDetail = { ...state.personalDetail, ...action.payload };
    },

    setProfessions: (state, action) => {
      state.professions = action.payload;
    },
    addProfessionalDetail: (state, action) => {
      state.professions.push(action.payload);
    },
    deleteProfessionalDetail: (state, action) => {
      state.professions = action.payload;
    },
    updateProfessionalDetail: (state, action) => {
      const updatedProfession = action.payload;
      const index = state.professions.findIndex(
        (profession) => profession._id === updatedProfession._id
      );
      if (index !== -1) {
        state.professions[index] = updatedProfession;
      }
    },

    setEducations: (state, action) => {
      state.educations = action.payload;
    },
    addEducationDetail: (state, action) => {
      state.educations.push(action.payload);
    },
    deleteEducationDetail: (state, action) => {
      state.educations = action.payload;
    },
    updateEducationDetail: (state, action) => {
      const updatedEducation = action.payload;
      const index = state.educations.findIndex(
        (education) => education._id === updatedEducation._id
      );
      if (index !== -1) {
        state.educations[index] = updatedEducation;
      }
    },

    setLinks: (state, action) => {
      state.links = action.payload;
    },
    addLink: (state, action) => {
      state.links.push(action.payload);
    },
    deleteLink: (state, action) => {
      state.links = action.payload;
    },
    updateLink: (state, action) => {
      const updatedLink = action.payload;
      const index = state.links.findIndex(
        (link) => link._id === updatedLink._id
      );
      if (index !== -1) {
        state.links[index] = updatedLink;
      }
    },

    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    deleteSkill: (state, action) => {
      state.skills = action.payload;
    },
    updateSkill: (state, action) => {
      const updatedSkill = action.payload;
      const index = state.skills.findIndex(
        (skill) => skill._id === updatedSkill._id
      );
      if (index !== -1) {
        state.skills[index] = updatedSkill;
      }
    },

    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
    addLanguage: (state, action) => {
      state.languages.push(action.payload);
    },
    deleteLanguage: (state, action) => {
      state.languages = action.payload;
    },
    updateLanguage: (state, action) => {
      const updatedLanguage = action.payload;
      const index = state.languages.findIndex(
        (language) => language._id === updatedLanguage._id
      );
      if (index !== -1) {
        state.languages[index] = updatedLanguage;
      }
    },

    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addCourseDetail: (state, action) => {
      state.courses.push(action.payload);
    },
    deleteCourseDetail: (state, action) => {
      state.courses = action.payload;
    },
    updateCourseDetail: (state, action) => {
      const updatedCourse = action.payload;
      const index = state.courses.findIndex(
        (course) => course._id === updatedCourse._id
      );
      if (index !== -1) {
        state.courses[index] = updatedCourse;
      }
    },

    setInternships: (state, action) => {
      state.internship = action.payload;
    },
    addInternshipDetail: (state, action) => {
      state.internship.push(action.payload);
    },
    deleteInternshipDetail: (state, action) => {
      state.internship = action.payload;
    },
    updateInternshipDetail: (state, action) => {
      const updatedInternship = action.payload;
      const index = state.internship.findIndex(
        (item) => item._id === updatedInternship._id
      );
      if (index !== -1) {
        state.internship[index] = updatedInternship;
      }
    },

    setHobbies: (state, action) => {
      state.hobbies = action.payload;
    },
    addHobbieDetail: (state, action) => {
      state.hobbies.push(action.payload);
    },
    deleteHobbieDetail: (state, action) => {
      state.hobbies = action.payload;
    },
    updateHobbieDetail: (state, action) => {
      const updatedHobbie = action.payload;
      const index = state.hobbies.findIndex(
        (item) => item._id === updatedHobbie._id
      );
      if (index !== -1) {
        state.hobbies[index] = updatedHobbie;
      }
    },

    setReference: (state, action) => {
      state.references = action.payload;
    },
    addReferenceDetail: (state, action) => {
      state.references.push(action.payload);
    },
    deleteReferenceDetail: (state, action) => {
      state.references = action.payload;
    },
    updateReferenceDetail: (state, action) => {
      const updateReference = action.payload;
      const index = state.references.findIndex(
        (item) => item._id === updateReference._id
      );
      if (index !== -1) {
        state.references[index] = updateReference;
      }
    },

    setCurriculars: (state, action) => {
      state.extraCurricular = action.payload;
    },
    addCurricularDetail: (state, action) => {
      state.extraCurricular.push(action.payload);
    },
    deleteCurricularDetail: (state, action) => {
      state.extraCurricular = action.payload;
    },
    updateCurricularDetail: (state, action) => {
      const updatedCurricular = action.payload;
      const index = state.extraCurricular.findIndex(
        (item) => item._id === updatedCurricular._id
      );
      if (index !== -1) {
        state.extraCurricular[index] = updatedCurricular;
      }
    },

    setCustomSections: (state, action) => {
      state.customSections = action.payload;
    },
    addCustomSection: (state, action) => {
      state.customSections.push(action.payload);
    },
    deleteCustomSection: (state, action) => {
      state.customSections = action.payload;
    },
    updateCustomSection: (state, action) => {
      const updatedCustomSection = action.payload;
      const index = state.customSections.findIndex(
        (item) => item._id === updatedCustomSection._id
      );
      if (index !== -1) {
        state.customSections[index] = updatedCustomSection;
      }
    },
  },
});

export const {
  resetResume,

  addResume,
  createResume,
  removeResume,
  setCurrentResume,
  resetResumeState,
  updatePersonalDetail,
  changeResumeTemplate,

  setProfessions,
  addProfessionalDetail,
  deleteProfessionalDetail,
  updateProfessionalDetail,

  setEducations,
  addEducationDetail,
  deleteEducationDetail,
  updateEducationDetail,

  setLinks,
  addLink,
  deleteLink,
  updateLink,

  setSkills,
  addSkill,
  deleteSkill,
  updateSkill,

  setLanguages,
  addLanguage,
  deleteLanguage,
  updateLanguage,

  setCourses,
  addCourseDetail,
  deleteCourseDetail,
  updateCourseDetail,

  setInternships,
  addInternshipDetail,
  deleteInternshipDetail,
  updateInternshipDetail,

  setHobbies,
  addHobbieDetail,
  deleteHobbieDetail,
  updateHobbieDetail,

  setReference,
  addReferenceDetail,
  deleteReferenceDetail,
  updateReferenceDetail,

  setCurriculars,
  addCurricularDetail,
  deleteCurricularDetail,
  updateCurricularDetail,

  setCustomSections,
  addCustomSection,
  deleteCustomSection,
  updateCustomSection,
} = resumeSlice.actions;

export default resumeSlice.reducer;
