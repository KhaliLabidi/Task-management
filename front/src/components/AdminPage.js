// front/src/components/AdminPage.js
import React from 'react';
import { Container, AppBar, Toolbar, Button, Box, Typography, Card, CardContent } from '@mui/material';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import AdminUserList from './AdminUserList';
import AdminCalendar from './AdminCalendar';
import AdminDashboard from './AdminDashboard';

const AdminPage = () => {
  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/admin/users">
            User List
          </Button>
          <Button color="inherit" component={Link} to="/admin/calendar">
            Calendar
          </Button>
          <Button color="inherit" component={Link} to="/admin/dashboard">
            Task Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Card sx={{ mt: 4, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Welcome, Admin!
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}>
        <Routes>
          <Route path="users" element={<AdminUserList />} />
          <Route path="calendar" element={<AdminCalendar />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/admin/users" />} />
        </Routes>
      </Box>
    </Container>
  );
};

export default AdminPage;