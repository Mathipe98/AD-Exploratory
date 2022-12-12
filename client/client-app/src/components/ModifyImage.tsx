import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { SERVER_ENDPOINTS } from '../config/constants';
import { useSelector } from '../store';
import { fileToBase64 } from '../utils/file';
import { apiPost } from '../utils/requests';

const theme = createTheme();

const ModifyImage = () => {
  const token = useSelector((state) => state.auth.bearerToken);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Navigate/redirect user if token is empty
  if (!token || token === '') {
    return <Navigate to={'/'} />;
  }
  const { updateImageUrl } = SERVER_ENDPOINTS;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const id = data.get('id') as string;
    if (id === '') {
      alert('Please enter an id');
      return;
    }
    let idNumber;
    try {
      idNumber = parseInt(id);
    } catch (error) {
      alert('Please enter a valid id (number)');
      return;
    }

    const params: any = {
      id: idNumber,
      title: null,
      description: null,
      keywords: null,
      author: null,
      capture: null,
      file: null
    };

    const title = data.get('title') as string;
    if (title !== '') {
      params.title = title;
    }

    const description = data.get('description') as string;
    if (description !== '') {
      params.description = description;
    }

    const keywords = data.get('keywords') as string;
    if (keywords !== '') {
      // Check if keywords matches comma-separated list of words
      const keywordsRegex = /^[a-zA-Z]+(,[a-zA-Z]+)*$/;
      if (!keywordsRegex.test(keywords)) {
        alert('Keywords must be a comma-separated list of words');
        return;
      }
      params.keywords = keywords;
    }

    const author = data.get('author') as string;
    if (author !== '') {
      params.author = author;
    }

    const captureDate = data.get('captureDate') as string;
    if (captureDate !== '') {
      // Ensure that the capture date is in the correct format
      const date = new Date(captureDate);
      if (date.toString() === 'Invalid Date') {
        alert('Capture date is not in the correct format (required: YYYY-MM-DD)');
        return;
      }
      params.capture = captureDate;
    }

    if (file !== null) {
      const base64 = await fileToBase64(file).then((result) => {
        if (result) {
          return result;
        } else {
          throw new Error('Failed to convert file to base64');
        }
      });
      params.file = base64;
    }

    const requestBody = new URLSearchParams(params);

    const headers = {
      // prettier-ignore
      'username': token,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    };

    const response = await apiPost(updateImageUrl, requestBody, headers).catch((error) => {
      console.error(error);
      setError(error.message || error.toString());
      setSuccess('');
    });

    // Check if the response status is 400-500 range
    if (!response || (response.status >= 400 && response.status < 510)) {
      const errorMessage = (response as any).error;
      setError(`Failed to register image: ${errorMessage}`);
      setSuccess('');
      return;
    }

    setSuccess(response.data.message);
    setError('');
  };

  // Create a function that shows the name of the image file once it's uploaded
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
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
            Update Image
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="Image ID:"
              name="id"
              autoComplete="id"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title of Image:"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description:"
              id="description"
              autoComplete="description"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="keywords"
              label="Image keywords (comma-separated):"
              id="keywords"
              autoComplete="keywords"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="author"
              label="Author (who took the photo):"
              id="author"
              autoComplete="author"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="captureDate"
              label="Date when the photo was taken (YYYY-MM-DD):"
              id="captureDate"
              autoComplete="captureDate"
            />
            <Button variant="contained" component="label">
              Upload New File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {file && <p>File chosen: {file.name}</p>}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Update
            </Button>
          </Box>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">{success}</Typography>}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ModifyImage;
