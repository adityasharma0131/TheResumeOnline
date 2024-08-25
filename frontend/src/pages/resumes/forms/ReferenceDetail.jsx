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
  setReference,
  addReferenceDetail,
  deleteReferenceDetail,
  updateReferenceDetail,
} from "../../../store/slices/resumeSlice";
import { FormInput } from "../../../components/index";
import { referenceDetailSchema } from "../../../schemas/index";

const ReferenceDetail = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const fetchedResumeDetail = resume;
  const refresh = useRefresh();

  const resumeId = fetchedResumeDetail.detail?.resumeId;

  // Fetch Reference
  const fetchReferences = async (resumeId) => {
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
        }/resume/${resumeId}?action=get-all-references`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data.references;

      dispatch(setReference(data || []));
      setFieldValue("references", data || []);
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error fetching references",
          type: "error",
        })
      );
    }
  };
  useEffect(() => {
    if (resumeId) {
      fetchReferences(resumeId);
    }
  }, [resumeId]);

  // Formik
  const formik = useFormik({
    initialValues: {
      references: fetchedResumeDetail.references || [],
    },
    validationSchema: referenceDetailSchema,
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

      const reference = values.references.find((item) => item._id === itemId);

      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/resume/${resumeId}?action=update-reference&rid=${itemId}`,
        reference,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;

      dispatch(updateReferenceDetail(data));
      dispatch(
        showAlert({
          message: "Reference updated successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({ message: "Error updating reference", type: "error" })
      );
    }
  };

  // Add Reference
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
        }/resume/${resumeId}?action=add-reference`,
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

      dispatch(addReferenceDetail(newData));
      setFieldValue("references", [...values.references, newData]);
      dispatch(
        showAlert({ message: "Reference added successfully", type: "success" })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error Adding Reference",
          type: "error",
        })
      );
    }
  };

  // Delete Reference
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
        }/resume/${resumeId}?action=delete-reference&rid=${itemId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;

      setFieldValue("references", data);
      dispatch(deleteReferenceDetail(data));
      dispatch(
        showAlert({
          message: "Reference deleted successfully",
          type: "success",
        })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error Deleting Reference",
          type: "error",
        })
      );
    }
  };

  // Toggle Card
  const toggleItemVisibility = (index) => {
    const updatedReference = values.references.map((reference, i) => {
      if (i === index) {
        return {
          ...reference,
          isOpen: !reference.isOpen,
        };
      }
      return reference;
    });
    setFieldValue("references", updatedReference);
    refresh();
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="item">
        <h4 className="sub-heading mb-3">References</h4>
        <p className="form-desc-text mb-7">Add who has referred you</p>

        <FieldArray
          name="references"
          render={() => (
            <>
              {values.references.map((item, index) => (
                <div
                  key={index}
                  className="content"
                  data-reference-id={item._id}
                >
                  {/* Head */}
                  <div className="head">
                    <div className="text">
                      <h5>{item.referenceFullname || `Full Name`}</h5>
                      <h6>
                        <span>{item.company || `Company`}</span>
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
                            label="Reference Full Name"
                            name={`references[${index}].referenceFullname`}
                            type="text"
                            className="mb-0"
                            required
                            value={item.referenceFullname}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormInput
                            label="Company"
                            name={`references[${index}].company`}
                            type="text"
                            className="mb-0"
                            required
                            value={item.company}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormInput
                            label="Phone"
                            name={`references[${index}].phone`}
                            type="tel"
                            className="mb-0"
                            required
                            value={item.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormInput
                            label="Email"
                            name={`references[${index}].email`}
                            type="email"
                            className="mb-0"
                            required
                            value={item.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="button-sm mt-3"
                        onClick={() => onSubmitHandler(item._id)}
                      >
                        Update Reference
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
          <span className="me-2">Add New reference</span>
          <FaPlus />
        </button>
      </form>
    </FormikProvider>
  );
};

export default ReferenceDetail;
