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
  setHobbies,
  addHobbieDetail,
  deleteHobbieDetail,
  updateHobbieDetail,
} from "../../../store/slices/resumeSlice";
import { FormInput } from "../../../components/index";
import { hobbieDetailSchema } from "../../../schemas/index";

const HobbieDetail = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const fetchedResumeDetail = resume;
  const refresh = useRefresh();

  const resumeId = fetchedResumeDetail.detail?.resumeId;

  // Fetch Hobbies
  const fetchHobbies = async (resumeId) => {
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
        }/resume/${resumeId}?action=get-all-hobbies`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data.hobbies;

      dispatch(setHobbies(data || []));
      setFieldValue("hobbies", data || []);
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error fetching hobbies",
          type: "error",
        })
      );
    }
  };
  useEffect(() => {
    if (resumeId) {
      fetchHobbies(resumeId);
    }
  }, [resumeId]);

  // Formik
  const formik = useFormik({
    initialValues: {
      hobbies: fetchedResumeDetail.hobbies || [],
    },
    validationSchema: hobbieDetailSchema,
    onSubmit: () => {},
    enableReinitialize: true,
  });
  const { values, handleChange, handleSubmit, setFieldValue } = formik;

  // On Submit Function
  const onSubmitHandler = async (itemId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        dispatch(
          showAlert({ message: "Unauthorized: No token found", type: "error" })
        );
        return;
      }

      const hobbie = values.hobbies.find((item) => item._id === itemId);

      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/resume/${resumeId}?action=update-hobbie&hid=${itemId}`,
        hobbie,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;

      dispatch(updateHobbieDetail(data));
      dispatch(
        showAlert({
          message: "Hobbie updated successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(showAlert({ message: "Error updating hobbie", type: "error" }));
    }
  };

  // Add Hobbie
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
        }/resume/${resumeId}?action=add-hobbie`,
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
      dispatch(addHobbieDetail(newData));
      setFieldValue("hobbies", [...values.hobbies, newData]);
      dispatch(
        showAlert({ message: "Hobbies added successfully", type: "success" })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error Adding hobbie",
          type: "error",
        })
      );
    }
  };

  // Delete Hobbie
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
        }/resume/${resumeId}?action=delete-hobbie&hid=${itemId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;

      setFieldValue("hobbies", data);
      dispatch(deleteHobbieDetail(data));
      dispatch(
        showAlert({
          message: "Hobbie deleted successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error Deleting hobbie",
          type: "error",
        })
      );
    }
  };

  // Toggle Card
  const toggleItemVisibility = (index) => {
    const updatedHobbie = values.hobbies.map((hobbie, i) => {
      if (i === index) {
        return {
          ...hobbie,
          isOpen: !hobbie.isOpen,
        };
      }
      return hobbie;
    });
    setFieldValue("hobbies", updatedHobbie);
    refresh();
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="item">
        <h4 className="sub-heading mb-3">Hobbies</h4>
        <p className="form-desc-text mb-7">
          Hobbies are activities that people enjoy doing in their free time for
          personal pleasure and relaxation.
        </p>

        <FieldArray
          name="hobbies"
          render={() => (
            <>
              {values.hobbies.map((item, index) => (
                <div key={index} className="content" data-hobbie-id={item._id}>
                  {/* Head */}
                  <div className="head">
                    <div className="text">
                      <h5>{item.label || `Hobbie Name`}</h5>
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
                        <div className="col-span-2">
                          <FormInput
                            label="Hobbie Name"
                            name={`hobbies[${index}].label`}
                            type="text"
                            className="mb-0"
                            required
                            value={item.label}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="button-sm mt-3"
                        onClick={() => onSubmitHandler(item._id)}
                      >
                        Update Hobbie
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
          <span className="me-2">Add New Hobbie</span>
          <FaPlus />
        </button>
      </form>
    </FormikProvider>
  );
};

export default HobbieDetail;
