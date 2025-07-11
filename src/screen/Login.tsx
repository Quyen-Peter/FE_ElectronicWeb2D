import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import { Mosaic } from 'react-loading-indicators';
import "../css/Loading.css";

interface TokenPayload {
  id: number;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  updateAt: string;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
     setLoading(true);
    try {
      const res = await fetch('https://electrical-learning-dqf3exbwf6b9dkcp.southeastasia-01.azurewebsites.net/api/Accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      
      if (res.status === 401) {
        setMessage('Email hoặc mật khẩu không đúng.');
        setLoading(false);
        return;
      }

      const data = await res.json();
      
      if (res.ok) {
        const token = data.value.token;
   
        localStorage.setItem('accessToken', token); 
        
        localStorage.setItem('fullName', data.value.fullName); 
        console.log("data login:", data);
        setMessage('Đăng nhập thành công!');
        navigate('/users');
    }
    else {
        setMessage(data.message || 'Đăng nhập thất bại!');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      setMessage('Không thể kết nối tới server.');
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <Mosaic color="#ff9800" size="medium" text="Đang đăng nhập..." textColor="#333" />
        </div>
      ) : (
        <div className="login-container">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Đăng nhập</h2>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Mật khẩu:</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Đăng nhập</button>
            {message && <p className="message">{message}</p>}
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
