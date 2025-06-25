import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/auth/register', {
        username,
        password,
      });

      localStorage.setItem('token', res.data.token);
      setMessage('Registration successful!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, paddingTop: '15%' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, fontWeight: 'bold' }}
        >
          Register
        </Button>
      </form>
      {message && (
        <Typography mt={2} color="primary">
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default Register;
