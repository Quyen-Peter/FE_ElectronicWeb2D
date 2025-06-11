import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Page</h2>
      <ul className="sidebar-menu">
        
        <li  
          className={`menu-item ${location.pathname === '/users' ? 'active' : ''}`}
          onClick={() => navigate('/users')}
        >
          <span>Quản lý người dùng</span>
        </li>

        <li style={{marginTop: 5, }}
          className={`menu-item ${location.pathname === '/material' ? 'active' : ''}`}
          onClick={() => navigate('/material')}
        >
          <span>Quản lý học liệu</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
