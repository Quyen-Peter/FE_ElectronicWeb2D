import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("fullName");
    setUserName(name || "");
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");

    localStorage.removeItem("fullName");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="top-section">
        <h2 className="sidebar-title">Admin Page</h2>
        {userName && <p className="sidebar-username">{userName}</p>}
        <div className="username-underline"></div>
        <ul className="sidebar-menu">
          <li
            className={`menu-item ${
              location.pathname === "/users" ||
              location.pathname.startsWith("/Detail-User/") ||
              location.pathname.startsWith("/Create-User")
                ? "active"
                : ""
            }`}
            onClick={() => navigate("/users")}
          >
            <span>Quản lý người dùng</span>
          </li>

          <li
            style={{ marginTop: 5 }}
            className={`menu-item ${
              location.pathname === "/material" ||
              location.pathname.startsWith("/material/Lession/")
                ? "active"
                : ""
            }`}
            onClick={() => navigate("/material")}
          >
            <span>Quản lý học liệu</span>
          </li>
        </ul>
      </div>

      <button
        className="logout-button"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
