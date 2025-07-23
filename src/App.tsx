import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './screen/Login';
import UserManagement from './screen/UserManagement';
import MaterialsManagement from './screen/MaterialsManagement';
import DetailUserManagement from './screen/DetailUserManagement';
import CreateUser from './screen/CreateUser';
import LessionManagement from './screen/LessionManagement';
import Exercises from './screen/Exercises';


const App = () => {
   return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/material" element={<MaterialsManagement />} />
          <Route path="/Detail-User/:id" element={<DetailUserManagement />} />
          <Route path="/Create-User" element={<CreateUser />} />
          <Route path="/material/Lession/:chapterId" element={<LessionManagement />} />
          <Route path="/material/Lession/:chapterId/exercises/:lessonId" element={<Exercises />} />
        </Routes>
      </Router>

      <ToastContainer
        position="bottom-right"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light"
        closeButton={false}
      />
    </>
  );
};

export default App;
