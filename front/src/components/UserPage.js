// front/src/components/UserPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Grid, Card, CardContent, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const UserPage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          params: { userId: 'currentUserId' } // Replace 'currentUserId' with the actual user ID
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleClickOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/user">
            Your Tasks
          </Button>
          <Button color="inherit" component={Link} to="/upload">
            Task Upload Page
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Tasks
        </Typography>
        <Grid container spacing={3}>
          {tasks.map(task => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {task.title}
                  </Typography>
                  <Typography color="textSecondary">
                    Status: {task.status}
                  </Typography>
                  <Typography color="textSecondary">
                    Due: {new Date(task.end).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleClickOpen(task)}>
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedTask?.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserPage;