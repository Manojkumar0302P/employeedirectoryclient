import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      navigate(res.data.role === 'admin' ? '/admin' : '/home');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input className="form-control mb-2" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input className="form-control mb-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
