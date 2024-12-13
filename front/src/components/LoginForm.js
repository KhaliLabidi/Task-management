// front/src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { TextField, Button, Container, Typography, Box, Link, Grid, Card, CardContent } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captcha: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (value) => {
    setFormData({ ...formData, captcha: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      const { role, username } = response.data;
      if (role === 'admin') {
        navigate('/admin', { state: { username } });
      } else if (role === 'privileged') {
        navigate('/privileged', { state: { username } });
      } else {
        navigate('/user');
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <img src="/img.jpg" alt="Login" style={{ width: '100%', borderRadius: '8px' }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Login
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    required
                  />
                  <Box sx={{ mt: 2, mb: 2 }}>
                    <ReCAPTCHA
                      sitekey="6LdkjZQqAAAAAA-himpegWcLACpO33BDTeXn1jaN"
                      onChange={handleCaptchaChange}
                    />
                  </Box>
                  <Button variant="contained" color="primary" type="submit" fullWidth>
                    Login
                  </Button>
                </form>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Don't have an account? <Link component={RouterLink} to="/register">Register here</Link>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginForm;