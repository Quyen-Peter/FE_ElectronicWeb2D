import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import { Mosaic } from "react-loading-indicators";
import "../css/Loading.css";
import adminLogin from "../asesst/adminLogin.png";

interface TokenPayload {
  id: number;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  updateAt: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.ocgi.space/api/Accounts/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (res.status === 401) {
        setMessage("Email hoặc mật khẩu không đúng.");
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (res.ok) {
        const token = data.value.token;

        localStorage.setItem("accessToken", token);

        localStorage.setItem("fullName", data.value.fullName);
        console.log("data login:", data);
        setMessage("Đăng nhập thành công!");
        navigate("/users");
      } else {
        setMessage(data.message || "Đăng nhập thất bại!");
      }
    } catch (err) {
      console.error("Login error:", err);

      setMessage("Không thể kết nối tới server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <Mosaic
            color="#ff9800"
            size="medium"
            text="Đang kiểm tra..."
            textColor="#333"
          />
        </div>
      ) : (
        <div className="login-page">
          <img src={adminLogin} alt="Background" className="background-img" />
          <div className="overlay">
            <form className="login-form" onSubmit={handleLogin}>
              <h2>Đăng nhập</h2>
              <div className="form-group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                 style={{ marginTop: "16px", }}
                />
              </div>
              <button type="submit" className="button">Đăng nhập</button>
              {message && <p className="message">{message}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
