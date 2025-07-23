import { useState } from "react";
import HeaderCreateUser from "../component/HeaderCreateUser";
import Sidebar from "../component/Sidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../css/CreateUser.css";

const CreateUser = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("Student");
  const Navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch(
        "https://api.ocgi.space/api/Accounts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ fullName, email, password, passwordConfirm , role }),
        }
      );

      if (res.ok) {
        toast.success("Tạo người mới dùng thành công!");
        Navigate("/users");
      } else {
        const errData = await res.json();
        toast.error(errData.message );
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Lỗi kết nối đến server!");
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
          <HeaderCreateUser />
        </div>

        <div className="create-user-container">
          <h2>Tạo người dùng mới</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Họ tên:</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Mật khẩu:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Xác nhận mật khẩu:</label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Vai trò:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button type="submit">Tạo người dùng</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
