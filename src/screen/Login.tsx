import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
    <div style={{ padding: '2rem' }}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
