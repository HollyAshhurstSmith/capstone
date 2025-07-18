import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#2E8B57', width: '100%' }}>
      <Toolbar sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
        
        {/* Left: App Title and Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 1 }}>
            KITCHEN BYTES
          </Typography>
          <EmojiFoodBeverageIcon sx={{ ml: 1 }} />
        </Box>

        {/* Center: Navigation Links */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 2,
          }}
        >
          <Button
            component={RouterLink}
            to="/recipe-book"
            color="inherit"
            sx={{ fontWeight: 'bold', textTransform: 'none' }}
          >
            RECIPE BOOK
          </Button>
          <Button
            component={RouterLink}
            to="/shopping-list"
            color="inherit"
            sx={{ fontWeight: 'bold', textTransform: 'none' }}
          >
            SHOPPING LIST
          </Button>
        </Box>

        {/* Right: Login/Logout */}
        <Box>
          {token ? (
            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{ fontWeight: 'bold', textTransform: 'none' }}
            >
              LOGOUT
            </Button>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              color="inherit"
              sx={{ fontWeight: 'bold', textTransform: 'none' }}
            >
              LOGIN
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;