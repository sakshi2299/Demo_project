import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Errors {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({ email: '', password: '' });

  const registeredUser = useSelector((state: any) => state.user.currentUser);

  const handleLogin = (): void => {
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

    const user: any = { email, password };

    if (user.email === registeredUser.email && user.password === registeredUser.password) {
      dispatch(setCurrentUser(user));
      console.log(user);
      setEmail('');
      setPassword('');
      toast.success('Login success'); // Show success toast notification
      localStorage.setItem('login', 'true');
      navigate('/');
    } else {
      toast.error('Invalid email or password'); // Show error toast notification
      setEmail('');
      setPassword('');
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <Typography variant="h6" sx={{ marginBottom: '10px', padding: '5px', textAlign: 'center' }}>
        LOGIN
      </Typography>
      <TextField
        sx={{ marginBottom: '10px', width: '97%' }}
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        sx={{ marginBottom: '10px', width: '97%' }}
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button
        sx={{ backgroundColor: '#1976d2', color: 'white', padding: '10px', width: '100%', borderRadius: '5px' }}
        onClick={handleLogin}
        variant="contained"
      >
        Login
      </Button>
      <ToastContainer
        position="top-center" // Set position to top-center
        autoClose={5000} // Adjust autoClose duration as needed
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default Login;
