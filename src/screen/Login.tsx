import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e: React.FormEvent) =>{
        e.preventDefault();
        try{
            const res = await fetch('https://electronicweb-ihci.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email,password}),
            });

            const data = await res.json();

            if(res.ok){
                setMessage(data.message);
                navigate('/users');
            }else{
                setMessage(data.message);
            }
        }catch(err){
            setMessage('connect server faild');
        }
    }

  return (
    <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Đăng nhập</h2>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="form-group">
                    <label>Mật khẩu:</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <button type="submit">Đăng nhập</button>
                <p className="message">{message}</p>
            </form>
        </div>
  );
};

export default Login;
