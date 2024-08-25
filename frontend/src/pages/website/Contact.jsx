import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";

import { Breadcrumb, FormInput, FormText } from "../../components";
import { showAlert } from "../../store/slices/alertSlice";
import { ContactBannerImg } from "../../static/images/contact";

const Contact = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/contact`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(
        showAlert({
          message: "Message Sent",
          type: "success",
        })
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      dispatch(
        showAlert({
          message:
            error.response?.data?.message ||
            "Error Sending Message, Please try again!",
          type: "error",
        })
      );
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Contact Section */}
      <section className="section contact">
        <div className="container">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-5">
              <div className="image">
                <img src={ContactBannerImg} alt="Contact Image" />
              </div>
            </div>
            <div className="col-span-7">
              <h2 className="title mb-3">Contact Us</h2>
              <h3 className="title-alt mb-8">Let's Talk</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <FormInput
                    label="Full Name"
                    name="name"
                    type="text"
                    className="mb-0"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  <FormInput
                    label="Email Id."
                    name="email"
                    type="email"
                    className="mb-0"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  <FormInput
                    label="Phone No."
                    name="phone"
                    type="number"
                    className="mb-0"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2">
                  <FormText
                    label="Message"
                    name="message"
                    rows="4"
                    className="mb-0"
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2">
                  <button className="button" type="submit">
                    Send Message
                  </button>
                </div>
              </form>

              <h3 className="title-alt mt-8 mb-8">Connect with us</h3>
              <div className="links">
                <Link to="tel:9768828078" className="link">
                  <MdOutlinePhone />
                  <span>+91 97688 28078</span>
                </Link>
                <Link to="mailto:theresumes.online@gmail.com" className="link">
                  <MdOutlineMailOutline />
                  <span>theresumes.online@gmail.com</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
