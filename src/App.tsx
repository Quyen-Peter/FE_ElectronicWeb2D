import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screen/Login';
import UserManagement from './screen/UserManagement';
import MaterialsManagement from './screen/MaterialsManagement';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/material" element={<MaterialsManagement/>} />
      </Routes>
    </Router>
  );
};

export default App;
