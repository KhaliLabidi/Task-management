// front/src/components/AdminCalendar.js
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const AdminCalendar = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: new Date(), end: new Date(), description: '', userId: '' });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setOpen(true);
  };

  const handleAddEvent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newEvent);
      setEvents([...events, response.data]);
      setOpen(false);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Calendar
        </Typography>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectSlot={handleSelectSlot}
        />
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              name="title"
              fullWidth
              value={newEvent.title}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Description"
              name="description"
              fullWidth
              value={newEvent.description}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>User</InputLabel>
              <Select
                name="userId"
                value={newEvent.userId}
                onChange={handleChange}
              >
                {users.map(user => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddEvent} color="primary">
              Add Event
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default AdminCalendar;