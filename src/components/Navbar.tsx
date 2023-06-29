import React from 'react';
import { Route, Link, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, createTheme, ThemeProvider } from '@mui/material';
import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import Protected from './Protected';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('login') === 'true';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('login', 'false');
    navigate('/login');
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0D47A1', // Change this to your desired dark blue color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CRUD
            </Typography>
            {isLoggedIn && (
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
            )}
            {!isLoggedIn && (
              <Button color="inherit" component={Link} to="/registration">
                Register
              </Button>
            )}
            {!isLoggedIn && (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
            {isLoggedIn && (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Protected Component={Home} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </>
    </ThemeProvider>
  );
};

export default Navbar;
