import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import '../css/UserManagement.css';
import HeaderUserManagement from "../component/HeaderUserManagement";


export interface User {
  userid: number;
  fullname: string;
  email: string;
  password: string;
  role: string;
  createat: string; 
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');


  useEffect(() => {
    fetch("https://electronicweb-ihci.onrender.com/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

const filteredUsers = users.filter(user =>
    user.fullname.toLowerCase().includes(searchName.toLowerCase()) &&
    user.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (

    <div style={{ display: 'flex' }}>
      <div style={{position: "fixed"}}><Sidebar /></div>
      <div className="content">
        <div style={{ position: 'fixed', top: 0, left: 252, right: 0, height: 60, zIndex: 100 }}>
          <HeaderUserManagement searchName = {searchName}  setSearchName = {setSearchName} searchEmail={searchEmail} setSearchEmail={setSearchEmail}/>
        </div>

      <div className="main-content">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (          
              <tr key={user.userid}>
                <td>{user.userid}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.createat
                    ? new Date(user.createat).toLocaleDateString("vi-VN")
                    : "Không rõ"}
                </td>
              </tr>
             
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default UserManagement;
