import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { showAlert } from "../../store/slices/alertSlice";
import { Breadcrumb } from "../../components";

const Unsubscribe = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { _id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/user/unsubscribe/${_id}`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(
        showAlert({
          message: "Unsubscribed",
          type: "success",
        })
      );
      setEmail("");
    } catch (error) {
      console.log(error);
      dispatch(
        showAlert({
          message: error.response?.data?.message || "Invalid Request",
          type: "error",
        })
      );
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb />

      <section className="section">
        <div className="container">
          <div className="unsubscribe-card">
            <h1 className="text-center heading text-primary mb-3">
              Unsubscribe
            </h1>
            <p className="text-center mb-7">
              You are about to unsubscribe from our newsletter. <br /> To
              confirm this action, please enter your email address below.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={handleChange}
              />
              <button type="submit">Unsubscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Unsubscribe;
