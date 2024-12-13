// front/src/components/TaskUploadPage.js
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Container, Typography, Box, Grid, Card, CardContent, Button, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const TaskUploadPage = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    setUploading(true);
    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
          Upload Completed Task Documents
        </Typography>
        <Box {...getRootProps()} sx={{ border: '2px dashed #ccc', p: 3, textAlign: 'center' }}>
          <input {...getInputProps()} />
          <Typography variant="body1">
            Drag & drop some files here, or click to select files
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {files.map((file, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="body2" component="p">
                    {file.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={uploading || files.length === 0}
          sx={{ mt: 2 }}
        >
          {uploading ? 'Uploading...' : 'Upload Files'}
        </Button>
      </Box>
    </Container>
  );
};

export default TaskUploadPage;