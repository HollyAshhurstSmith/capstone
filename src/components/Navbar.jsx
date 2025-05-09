import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#2E8B57', width: '100%' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left: Title + Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: 1,
              fontFamily: 'sans-serif',
            }}
          >
            RECIPE BOOK APP
          </Typography>
          <EmojiFoodBeverageIcon sx={{ ml: 1 }} />
        </Box>

        {/* Center: HOME + RECIPES */}
        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ textTransform: 'none', fontWeight: 'bold', letterSpacing: '0.07rem' }}
          >
            RECIPE BOOK
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ textTransform: 'none', fontWeight: 'bold', letterSpacing: '0.07rem' }}
          >
            SHOPPING LIST
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/recipes"
            sx={{ textTransform: 'none', fontWeight: 'bold', letterSpacing: '0.07rem' }}
          >
            SHARED RECIPES
          </Button>
        </Box>

        {/* Right: LOGIN */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccountCircleIcon />
          <Button
            color="inherit"
            component={RouterLink}
            to="/login"
            sx={{ textTransform: 'none', fontWeight: 'bold', letterSpacing: '0.07rem' }}
          >
            LOGIN/LOGOUT
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
