import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { login, setLoading } from "./store/slices/authSlice";
import { hideAlert } from "./store/slices/alertSlice";
import {
  AuthenticationLayout,
  ResumeLayout,
  DashboardLayout,
  WebsiteLayout,
} from "./layouts/index";
import { Alert } from "./components/index";
import { Register, Login, ForgotPassword } from "./pages/authentication/index";
import {
  Dashboard,
  Profile,
  Resume,
  UpdateProfileDetails,
} from "./pages/dashboard/index";
import {
  About,
  Contact,
  Home,
  PaymentPolicy,
  Pricing,
  PrivacyPolicy,
  Templates,
} from "./pages/website/index";
import { BlogList, Post01, Post02, Post03, Post04 } from "./pages/website/blog";
import { ResumePage } from "./pages/resumes/index";
import { ProtectedRoute, FetchUserData, ScrollToTop } from "./utils/index";
import Unsubscribe from "./pages/website/Unsubscribe";

const App = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const alert = useSelector((state) => state.alert);

  // Close Alert Handler
  const handleCloseAlert = () => {
    dispatch(hideAlert());
  };

  // Get User data
  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const userData = await FetchUserData();
        if (userData) {
          dispatch(
            login({
              isAuthenticated: true,
              loading: false,
              user: userData,
              error: null,
            })
          );
        } else {
          dispatch(setLoading(false));
        }
      } else {
        dispatch(setLoading(false));
      }
    };

    initializeUser();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {alert.visible && (
        <Alert
          className={`alert-${alert.type}`}
          message={alert.message}
          onClose={handleCloseAlert}
        />
      )}

      <Router>
        <ScrollToTop />
        <Routes>
          {/* Authentication Routes */}
          <Route path="/" element={<AuthenticationLayout />}>
            <Route
              path="/register"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
              }
            />
            <Route
              path="/forgot-password"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <ForgotPassword />
                )
              }
            />
          </Route>

          {/* Website Routes */}
          <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/payment-policy" element={<PaymentPolicy />} />
            <Route path="/unsubscribe/:_id" element={<Unsubscribe />} />
            <Route path="/blog">
              <Route index element={<BlogList />} />
              <Route
                path="capture-attention-and-land-interviews-with-a-killer-cover-letter"
                element={<Post01 />}
              />
              <Route
                path="mastering-the-art-of-thank-you-notes-in-the-workplace"
                element={<Post02 />}
              />
              <Route
                path="how-to-write-a-resume-the-ultimate-guide-to-writing-a-resume"
                element={<Post03 />}
              />
              <Route
                path="top-questions-to-ask-during-a-job-interview"
                element={<Post04 />}
              />
            </Route>
          </Route>

          {/* Resume Routes */}
          <Route
            path="/resumes"
            element={
              <ProtectedRoute>
                <ResumeLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="create/:_id"
              element={
                <ProtectedRoute>
                  <ResumePage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            >
              <Route path="update-details" element={<UpdateProfileDetails />} />
            </Route>
            <Route
              path="resumes"
              element={
                <ProtectedRoute>
                  <Resume />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
