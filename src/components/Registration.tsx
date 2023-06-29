import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';

interface Errors {
  name: string;
  email: string;
  password: string;
}

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({ name: '', email: '', password: '' });

  const handleRegister = () => {
    setErrors({ name: '', email: '', password: '' });

    let isValid = true;

    if (!name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Name is required',
      }));
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email format',
      }));
      isValid = false;
    }

    if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password should be at least 6 characters long',
      }));
      isValid = false;
    }

    if (isValid) {
      const user:any = { name, email, password };
      dispatch(setCurrentUser(user));
      setName('');
      setEmail('');
      setPassword('');
      navigate('/login');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '10px', padding: '5px', textAlign: 'center' }}>REGISTRATION</h2>
      <input
        style={{ marginBottom: '10px', padding: '5px', width: '97%', borderRadius: '5px', border: '1px solid #ccc' }}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && <div style={{ color: 'red', marginBottom: '10px' }}>{errors.name}</div>}
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
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
};

export default Registration
