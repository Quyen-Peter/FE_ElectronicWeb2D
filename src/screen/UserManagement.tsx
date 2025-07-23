import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import HeaderUserManagement from "../component/HeaderUserManagement";
import "../css/UserManagement.css";
import { useNavigate } from "react-router-dom";
import { Mosaic } from "react-loading-indicators";
import "../css/Loading.css";


interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  updateAt: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("Không có token");
      setLoading(false);
      return;
    }

    const url = `https://api.ocgi.space/api/Accounts?searchTerm=${searchTerm}&pageIndex=${pageIndex}&pageSize=${pageSize}`;

    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (res.ok) {
        const data = await res.json();
        console.log("data:", data);
        setUsers(data.value?.items || []);
      }
    } catch (err) {
      console.error("Lỗi gọi API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, pageIndex]);

  
  
  

  return (
    <div
      style={{ display: "flex", height: "100vh", backgroundColor: "#f9f9f9" }}
    >
      <div style={{ position: "fixed" }}>
        <Sidebar />
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 252,
            right: 0,
            height: 60,
            zIndex: 100,
          }}
        >
          <HeaderUserManagement
            searchName={searchTerm}
            setSearchName={setSearchTerm}
          />
        </div>

        <div className="main-content">
          {loading ? (
            <div className="loading" style={{marginTop: '-100px',}}><Mosaic color="#ff9800" size="medium" text="Đang tải..." textColor="#333" /></div>
          ) : users.length > 0 ? (
            <table className="user-table">
              <thead>
                <tr>
                  <th className="th-style">ID</th>
                  <th className="th-style">Tên</th>
                  <th className="th-style">Email</th>
                  <th className="th-style">Vai trò</th>
                  <th className="th-style">Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="td-style">{user.id}</td>
                    <td className="td-style">{user.fullName}</td>
                    <td className="td-style">{user.email}</td>
                    <td className="td-style">{user.role}</td>
                    <td className="td-style">
                      {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                    </td>

                    <td className="td-style">
                      <button
                        className="btn-detail"
                        onClick={() => navigator(`/Detail-User/${user.id}`)}
                      >
                       chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: "#666" }}>Không tìm thấy người dùng nào.</p>
          )}

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              gap: "20px",
              alignItems: "center",
              marginLeft: "400px",
            }}
          >
            <button
              className="btn-style"
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
            >
              ← Trang trước
            </button>
            <span>Trang {pageIndex}</span>
            <button
              className="btn-style"
              onClick={() => setPageIndex((prev) => prev + 1)}
            >
              Trang sau →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
