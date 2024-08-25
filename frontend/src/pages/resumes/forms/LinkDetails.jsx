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
  setLinks,
  addLink,
  deleteLink,
  updateLink,
} from "../../../store/slices/resumeSlice";
import { FormInput } from "../../../components/index";
import { linkDetailSchema } from "../../../schemas/index";

const LinkDetails = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const { links: fetchedLinks, detail } = resume;
  const refresh = useRefresh();

  const resumeId = detail.resumeId;

  // Fetch Links
  const fetchLinks = async (resumeId) => {
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
        }/resume/${resumeId}?action=get-all-links`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data.links;
      dispatch(setLinks(data || []));
      formik.setFieldValue("links", data || []);
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error fetching links",
          type: "error",
        })
      );
    }
  };
  useEffect(() => {
    if (resumeId) {
      fetchLinks(resumeId);
    }
  }, [resumeId]);

  // Formik
  const formik = useFormik({
    initialValues: {
      links: fetchedLinks || [],
    },
    validationSchema: linkDetailSchema,
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

      const link = values.links.find((link) => link._id === itemId);

      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/resume/${resumeId}?action=update-link&lid=${itemId}`,
        link,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;
      dispatch(updateLink(data));
      dispatch(
        showAlert({ message: "Link updated successfully", type: "success" })
      );
      refresh();
    } catch (error) {
      dispatch(showAlert({ message: "Error updating link", type: "error" }));
    }
  };

  // Add Link
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
        }/resume/${resumeId}?action=add-link`,
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
      dispatch(addLink(newData));
      setFieldValue("links", [...values.links, newData]);
      dispatch(
        showAlert({ message: "Links added successfully", type: "success" })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error adding link",
          type: "error",
        })
      );
    }
  };

  // Delete Link
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
        }/resume/${resumeId}?action=delete-link&lid=${itemId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;
      setFieldValue("links", data);
      dispatch(deleteLink(data));
      dispatch(
        showAlert({ message: "Link deleted successfully", type: "success" })
      );
      refresh();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Error deleting link",
          type: "error",
        })
      );
    }
  };

  // Toggle card
  const toggleItemVisibility = (index) => {
    const updatedLinks = values.links.map((link, i) => {
      if (i === index) {
        return {
          ...link,
          isOpen: !link.isOpen,
        };
      }
      return link;
    });
    setFieldValue("links", updatedLinks);
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="item">
        <h4 className="sub-heading mb-3">Social Links</h4>
        <p className="form-desc-text mb-7">
          Social links in a resume are URLs that direct to an individual's
          professional profiles on social media platforms like LinkedIn.
        </p>

        <FieldArray
          name="links"
          render={() => (
            <>
              {values.links.map((item, index) => (
                <div key={index} className="content" data-link-id={item._id}>
                  {/* Head */}
                  <div className="head">
                    <div className="text">
                      <h5>{item.label || `Link Name`}</h5>
                      <h6>
                        <span>{item.link || `#`}</span>
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
                            label="Label"
                            name={`links[${index}].label`}
                            type="text"
                            className="mb-0"
                            required
                            value={item.label}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <FormInput
                            label="Link"
                            name={`links[${index}].link`}
                            type="text"
                            className="mb-0"
                            required
                            value={item.link}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="button-sm mt-3"
                        onClick={() => onSubmitHandler(item._id)}
                      >
                        Update Link
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
          <span className="me-2">Add New Link</span>
          <FaPlus />
        </button>
      </form>
    </FormikProvider>
  );
};

export default LinkDetails;
