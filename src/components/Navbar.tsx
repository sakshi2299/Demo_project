import React from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, createTheme, ThemeProvider } from '@mui/material';

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
              TASK MANAGEMENT
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

      </>
    </ThemeProvider>
  );
};

export default Navbar;
