import axios from "axios";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
// import { Uploader } from "Uploader";
import { UploadButton } from "react-uploader";

import { Modal } from "../../components/index";
import { DummyUser } from "../../static/images/users";
import { updateProfile } from "../../store/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const location = useLocation();
  const navigate = useNavigate();

  const isDetailsModalOpen = location.pathname.includes(
    "/dashboard/profile/update-details"
  );

  const handleCloseModal = () => {
    navigate("/dashboard/profile");
  };

  const handleUploadComplete = async (files) => {
    try {
      const token = localStorage.getItem("authToken");
      const file = files[0].fileUrl;

      // Use FormData to send the image file
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/user/update-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      dispatch(updateProfile(response.data.data));
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  // Initialize once (at the start of your app).
  // const uploader = Uploader({
  //   apiKey: "free",
  // });

  // Configuration options
  const options = { multi: false };

  if (!isAuthenticated || !auth || !auth.email) {
    return <div>Loading...</div>;
  }

  return (
    <div className="db-profile">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-1">
          <div className="profile-card card">
            <div className="card-body">
              <div className="image">
                {auth.avatar ? (
                  <img src={auth.avatar} alt={auth.fullName} />
                ) : (
                  <img src={DummyUser} alt={auth.fullName} />
                )}
                <UploadButton
                  // uploader={uploader}
                  options={options}
                  onComplete={handleUploadComplete}
                >
                  {({ onClick }) => (
                    <button onClick={onClick} className="upload-avatar-btn">
                      <GoPencil />
                    </button>
                  )}
                </UploadButton>
              </div>
              <div className="text">
                <h5>{auth.fullName}</h5>
                <h6>{auth.email}</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="profile-detail card">
            <div className="card-head">
              <h5>Basic Information</h5>
              <Link
                to="/dashboard/profile/update-details"
                className="upload-profile-btn"
              >
                <GoPencil />
                <span>Edit</span>
              </Link>
            </div>
            <div className="card-body">
              <table>
                <tbody>
                  <tr>
                    <th>Full Name</th>
                    <td>{auth.fullName}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{auth.email}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{auth.phone || "N/A"}</td>
                  </tr>
                  <tr>
                    <th>Gender</th>
                    <td>{auth.gender || "N/A"}</td>
                  </tr>
                  <tr>
                    <th>Birth Date</th>
                    <td>
                      {auth.birthDate
                        ? new Date(auth.birthDate).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <th>Pronounce</th>
                    <td>{auth.pronounce || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal show={isDetailsModalOpen} onClose={handleCloseModal}>
        <Outlet />
      </Modal>
    </div>
  );
};

export default Profile;
