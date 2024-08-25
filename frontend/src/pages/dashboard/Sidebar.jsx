import { NavLink } from "react-router-dom";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { FiUser } from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="db-sidebar">
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "db-sidebar-link active" : "db-sidebar-link"
            }
            end
          >
            <RxDashboard />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive ? "db-sidebar-link active" : "db-sidebar-link"
            }
          >
            <FiUser />
            <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/resumes"
            className={({ isActive }) =>
              isActive ? "db-sidebar-link active" : "db-sidebar-link"
            }
          >
            <HiOutlineDocumentText />
            <span>Resumes</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
