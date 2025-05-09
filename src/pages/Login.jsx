import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function Login() {
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>LOGIN</Typography>
      <form>
        <TextField fullWidth label="Username" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />
        <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: '#4caf50', // your desired hex color
          '&:hover': {
            backgroundColor: '#2E8B57', // slightly darker for hover effect
          },
          fontWeight: 'bold'
        }}
      >
        Login
      </Button>

      </form>
    </Box>
  );
}

export default Login;
