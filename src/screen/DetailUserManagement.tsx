import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderDetailUser from "../component/HeaderDetailUser";
import Sidebar from "../component/Sidebar";
import "../css/DetailUserManagement.css";
import { Mosaic } from "react-loading-indicators";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DetailUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [editedUser, setEditedUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const Navigater = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(
      `https://api.ocgi.space/api/Accounts/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    setUser(data.value);
    setEditedUser(data.value);
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (field: string, value: string) => {
    setEditedUser((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleUpdateClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(
        `https://api.ocgi.space/api/Accounts/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        }
      );

      if (res.ok) {
        toast.success("Cập nhật thành công!");
        await fetchUser();
        setIsEditing(false);
      } else {
        toast.error("Cập nhật thất bại!");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Lỗi kết nối!");
    }
  };

  const handleDeleteClick = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(`https://api.ocgi.space/api/Accounts/${id}`, {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        Navigater("/users");
        toast.success("Xóa người dùng thành công");
      } else {
        toast.error("Xóa thất bại");
        await fetchUser();
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Lỗi kết nối!");
    }
  };

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
          <HeaderDetailUser
            isEditing={isEditing}
            onUpdateClick={handleUpdateClick}
            onSaveClick={handleSaveClick}
            onCancelClick={handleCancelClick}
            onDeleteClick={handleDeleteClick}
          />
        </div>
        <div>
          {!user || user.length === 0 ? (
            <div className="loading" style={{ marginLeft: "100px" }}>
              <Mosaic
                color="#ff9800"
                size="medium"
                text="Đang tải..."
                textColor="#333"
              />
            </div>
          ) : (
            <div className="user-detail-container">
              <h2 className="section-title">Chi tiết người dùng</h2>
              <div className="user-detail-row">
                <span className="label">Họ tên:</span>
                {isEditing ? (
                  <input
                    className="input-edit"
                    value={editedUser.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                  />
                ) : (
                  <span className="value">{user.fullName}</span>
                )}
              </div>

              <div className="user-detail-row">
                <span className="label">Email:</span>
                {isEditing ? (
                  <input
                    className="input-edit"
                    value={editedUser.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                ) : (
                  <span className="value">{user.email}</span>
                )}
              </div>

              <div className="user-detail-row">
                <span className="label">Vai trò:</span>
                {isEditing ? (
                  <select
                    className="input-edit"
                    value={editedUser.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                  </select>
                ) : (
                  <span className="value">{user.role}</span>
                )}
              </div>

              <div className="user-detail-row">
                <span className="label">Ngày tạo:</span>
                <span className="value">
                  {new Date(user.createdAt).toLocaleString("vi-VN")}
                </span>
              </div>

              <div className="user-detail-row">
                <span className="label">Ngày sửa:</span>
                <span className="value">
                  {new Date(user.updatedAt).toLocaleString("vi-VN")}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
