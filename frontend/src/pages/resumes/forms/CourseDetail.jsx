import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { useFormik, FieldArray, FormikProvider } from "formik";

import formatDate from "../../../utils/dateFormator";
import useRefresh from "../../../utils/useRefresh";
import { showAlert } from "../../../store/slices/alertSlice";
import {
  setCourses,
  addCourseDetail,
  updateCourseDetail,
  deleteCourseDetail,
} from "../../../store/slices/resumeSlice";
import { FormInput, FormText } from "../../../components/index";
import { courseDetailSchema } from "../../../schemas/index";

const CourseDetail = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const fetchedResumeDetail = resume;
  const refresh = useRefresh();

  const resumeId = fetchedResumeDetail.detail.resumeId;

  // Fetch Course
  const fetchCourses = async (resumeId) => {
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
        }/resume/${resumeId}?action=get-all-courses`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data.courses;
      dispatch(setCourses(data || []));
      setFieldValue("courses", data || []);
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error fetching courses",
          type: "error",
        })
      );
    }
  };
  useEffect(() => {
    if (resumeId) {
      fetchCourses(resumeId);
    }
  }, [resumeId]);

  // Formik
  const formik = useFormik({
    initialValues: {
      courses: fetchedResumeDetail.courses || [],
    },
    validationSchema: courseDetailSchema,
    onSubmit: () => {},
    enableReinitialize: true,
  });
  const { values, handleChange, handleSubmit, setFieldValue } = formik;

  // On Submit Handler
  const onSubmitHandler = async (itemId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        dispatch(
          showAlert({ message: "Unauthorized: No token found", type: "error" })
        );
        return;
      }

      const course = values.courses.find((course) => course._id === itemId);

      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/resume/${resumeId}?action=update-course&cid=${itemId}`,
        course,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;
      dispatch(updateCourseDetail(data));
      dispatch(
        showAlert({
          message: "Course updated successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(showAlert({ message: "Error updating course", type: "error" }));
    }
  };

  // Add Course
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
        }/resume/${resumeId}?action=add-course`,
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
      dispatch(addCourseDetail(newData));
      setFieldValue("courses", [...values.courses, newData]);
      dispatch(
        showAlert({ message: "Course added successfully", type: "success" })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error Adding Course",
          type: "error",
        })
      );
    }
  };

  // Delete Course
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
        }/resume/${resumeId}?action=delete-course&cid=${itemId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setFieldValue("courses", data);
      dispatch(deleteCourseDetail(data));
      dispatch(
        showAlert({
          message: "Course deleted successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error Deleting Course",
          type: "error",
        })
      );
    }
  };

  // Toggle Card
  const toggleItemVisibility = (index) => {
    const updatedCourses = values.courses.map((course, i) => {
      if (i === index) {
        return {
          ...course,
          isOpen: !course.isOpen,
        };
      }
      return course;
    });
    setFieldValue("courses", updatedCourses);
    refresh();
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="item">
        <h4 className="sub-heading mb-3">Courses</h4>
        <p className="form-desc-text mb-7">
          Short description about The course that you have learnt{" "}
        </p>

        <FieldArray
          name="courses"
          render={() => (
            <>
              {values.courses.map((item, index) => (
                <div key={index} className="content" data-course-id={item._id}>
                  {/* Head */}
                  <div className="head">
                    <div className="text">
                      <h5>{item.title || `Title`}</h5>
                      <h6>
                        <span>
                          {formatDate(item.startDate) || `Start Date`}
                        </span>
                        <span>-</span>
                        <span>{formatDate(item.endDate) || `End Date`}</span>
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
                            label="Title"
                            name={`courses[${index}].title`}
                            type="text"
                            className="mb-0"
                            required
                            value={item.title}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormInput
                            label="Institute"
                            name={`courses[${index}].institute`}
                            type="text"
                            className="mb-0"
                            required
                            value={item.institute}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormInput
                            label="Start Date"
                            name={`courses[${index}].startDate`}
                            type="date"
                            className="mb-0"
                            required
                            value={formatDate(item.startDate)}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormInput
                            label="End Date"
                            name={`courses[${index}].endDate`}
                            type="date"
                            className="mb-0"
                            required
                            value={formatDate(item.endDate)}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormInput
                            label="City"
                            name={`courses[${index}].city`}
                            type="text"
                            className="mb-0"
                            required
                            value={item.city}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-span-2">
                          <FormText
                            label="Description"
                            name={`courses[${index}].description`}
                            rows="4"
                            className="mb-0"
                            required
                            value={item.description}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="button-sm mt-3"
                        onClick={() => onSubmitHandler(item._id)}
                      >
                        Update Course
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
          <span className="me-2">Add New Course</span>
          <FaPlus />
        </button>
      </form>
    </FormikProvider>
  );
};

export default CourseDetail;
