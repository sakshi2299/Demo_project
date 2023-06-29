import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';

interface Errors {
  email: string;
  password: string;
}



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({ email: '', password: '' });

  const registeredUser = useSelector((state: any) => state.user.currentUser);

  const handleLogin = () => {
    setErrors({ email: '', password: '' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email format',
      }));
      return;
    }

    if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password should be at least 6 characters long',
      }));
      return;
    }

    const user:any = { email, password };

    if (user.email === registeredUser.email && user.password === registeredUser.password) {
      dispatch(setCurrentUser(user));
      console.log(user);
      setEmail('');
      setPassword('');
      alert('Login success');
      localStorage.setItem('login', 'true');
      navigate('/');

    } else {
      alert('Invalid email or password');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '10px', padding: '5px', textAlign: 'center', color: '' }}>LOGIN</h2>
      <input
        style={{ marginBottom: '10px', padding: '5px', width: '97%', borderRadius: '5px', border: '1px solid #ccc' }}
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <div style={{ color: 'red', marginBottom: '10px' }}>{errors.email}</div>}
      <input
        style={{ marginBottom: '10px', padding: '5px', width: '97%', borderRadius: '5px', border: '1px solid #ccc' }}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <div style={{ color: 'red', marginBottom: '10px' }}>{errors.password}</div>}
      <button
        style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px', border: 'none', width: '100%', borderRadius: '5px' }}
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
