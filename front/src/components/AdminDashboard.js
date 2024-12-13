// front/src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Grid, Card, CardContent, CardActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
        calculateStatusDistribution(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const calculateStatusDistribution = (tasks) => {
    const statusCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    const distribution = Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status]
    }));

    setStatusDistribution(distribution);
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, { status });
      const updatedTasks = tasks.map(task => (task._id === id ? response.data : task));
      setTasks(updatedTasks);
      calculateStatusDistribution(updatedTasks);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Task Dashboard
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
          <PieChart width={400} height={400}>
            <Pie
              data={statusDistribution}
              cx={200}
              cy={200}
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {statusDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Box>
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
                  <Typography color="textSecondary">
                    Assigned to: {task.userId?.username || 'Unassigned'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    >
                      <MenuItem value="in progress">In Progress</MenuItem>
                      <MenuItem value="done">Done</MenuItem>
                    </Select>
                  </FormControl>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;