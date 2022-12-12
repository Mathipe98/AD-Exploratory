import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Buffer } from 'buffer';
import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { SERVER_ENDPOINTS } from '../config/constants';
import { useSelector } from '../store';
import { Image } from '../types/GenericTypes';
import { handleDelete } from '../utils/delete';
import { apiGet } from '../utils/requests';
const theme = createTheme();

const ListImages = () => {
  const token = useSelector((state) => state.auth.bearerToken);
  const [images, setImages] = useState<Image[]>([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { deleteImageUrl, listImagesUrl } = SERVER_ENDPOINTS;

  // Navigate/redirect user if token is empty
  if (!token || token === '') {
    return <Navigate to={'/'} />;
  }

  // Decode 'token' from base64
  const username = Buffer.from(token, 'base64').toString();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const headers = {
      username: token,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    };
    apiGet(listImagesUrl, headers)
      .then((response) => {
        console.log(JSON.stringify(response));
        if (!response) {
          return;
        }
        setSuccessMsg(response.data.message);
        setErrorMsg('');
        setImages(response.data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMsg('Failed to list images: ' + error.message || error.toString());
        setSuccessMsg('');
      });
  };

  const deleteImage = (id: number) => {
    // Take input from alert
    const input = prompt('Are you sure you want to delete this image? (y/n)');
    if (input === 'y') {
      handleDelete(deleteImageUrl, id, token)
        .then((res) => {
          setSuccessMsg(res.data.message);
          setErrorMsg('');
          // Remove the image from the state-list
          setImages(images.filter((image) => image.id !== id));
        })
        .catch((err) => {
          setErrorMsg(`Image deletion failed: ${err.message}`);
          setSuccessMsg('');
        });
    } else {
      setErrorMsg('Image deletion cancelled.');
      setSuccessMsg('');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            List Images
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              List All Images!
            </Button>
            {successMsg && <Typography color="success">{successMsg}</Typography>}
            {errorMsg && <Typography color="error">Error: {errorMsg}</Typography>}
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          {images.length == 0 ? (
            <p>{'No images to show :('}</p>
          ) : (
            images.map((image) => (
              <div key={image.id} style={{ marginRight: 5 }}>
                <img src={image.base64} alt={image.title} />
                <p>ID: {image.id}</p>
                <p>Title: {image.title}</p>
                <p>Description: {image.description}</p>
                <p>Author: {image.author}</p>
                <p>
                  Capture date:{' '}
                  {`${image.captureDate.year}-${image.captureDate.month}-${image.captureDate.day}`}
                </p>
                <p>Keywords: {image.keywords}</p>
                {image.creator === username && (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => deleteImage(image.id)}>
                    Delete
                  </Button>
                )}
              </div>
            ))
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ListImages;
