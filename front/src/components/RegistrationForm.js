// front/src/components/RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { TextField, Button, Container, Typography, Box, Link, Grid, Card, CardContent, Snackbar, Alert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    captcha: ''
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (value) => {
    setFormData({ ...formData, captcha: value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      setPasswordError('Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.');
      return;
    }

    setPasswordError('');

    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      console.log(response.data);

      // Log the verification code
      console.log('Verification code sent to email:', response.data.verificationCode);

      // Send the verification code via EmailJS
      emailjs.send('service_ygxyfs3', 'template_45d26dw', {
        to_email: formData.email,
        to_name: formData.username,
        verification_code: response.data.verificationCode
      }, '3TDvt6vhhtkY8iD5O')
      .then((result) => {
        console.log('Email sent:', result.text);
      }, (error) => {
        console.error('Error sending email:', error.text);
      });

      setStep(2);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/verify', { email: formData.email, verificationCode });
      console.log(response.data);
      setOpen(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3 }}>
                {step === 1 ? (
                  <>
                    <Typography variant="h4" component="h1" gutterBottom>
                      Register
                    </Typography>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      {passwordError && (
                        <Typography variant="body2" color="error">
                          {passwordError}
                        </Typography>
                      )}
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
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
                        Register
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <Typography variant="h4" component="h1" gutterBottom>
                      Enter Verification Code
                    </Typography>
                    <form onSubmit={handleVerify}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Verification Code"
                        name="verificationCode"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                      />
                      <Button variant="contained" color="primary" type="submit" fullWidth>
                        Verify
                      </Button>
                    </form>
                  </>
                )}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    {step === 1 ? (
                      <>
                        Already have an account? <Link component={RouterLink} to="/login">Login here</Link>
                      </>
                    ) : (
                      <>
                        Didn't receive the code? <Link component={RouterLink} to="/register">Resend code</Link>
                      </>
                    )}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src="/img.jpg" alt="Register" style={{ width: '100%', borderRadius: '8px' }} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Successfully registered! Redirecting to login...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegistrationForm;