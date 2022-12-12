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

const RegisterImage = () => {
  const token = useSelector((state) => state.auth.bearerToken);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Navigate/redirect user if token is empty
  if (!token || token === '') {
    return <Navigate to={'/'} />;
  }
  const { registerImageUrl } = SERVER_ENDPOINTS;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const title = data.get('title') as string;
    if (title === '') {
      alert('Please enter a title');
      return;
    }

    const description = data.get('description') as string;
    if (description === '') {
      alert('Please enter a description');
      return;
    }

    const keywords = data.get('keywords') as string;
    if (keywords === '') {
      alert('Please enter keywords');
      return;
    }
    // Check if keywords matches comma-separated list of words
    const keywordsRegex = /^[a-zA-Z]+(,[a-zA-Z]+)*$/;
    if (!keywordsRegex.test(keywords)) {
      alert('Keywords must be a comma-separated list of words');
      return;
    }

    const author = data.get('author') as string;
    if (author === '') {
      alert('Please enter an author');
      return;
    }

    const captureDate = data.get('captureDate') as string;
    if (captureDate === '') {
      alert('Please enter a capture date');
      return;
    }

    // Ensure that the capture date is in the correct format
    const date = new Date(captureDate);
    if (date.toString() === 'Invalid Date') {
      alert('Capture date is not in the correct format (required: YYYY-MM-DD)');
      return;
    }

    if (file === null) {
      alert('Please select a file');
      return;
    }
    const base64 = await fileToBase64(file).then((result) => {
      if (result) {
        return result;
      } else {
        throw new Error('Failed to convert file to base64');
      }
    });

    const requestBody = new URLSearchParams({
      title,
      description,
      keywords,
      author,
      capture: captureDate,
      file: base64
    });

    const headers = {
      // prettier-ignore
      'username': token,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    };

    const response = await apiPost(registerImageUrl, requestBody, headers).catch((error) => {
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
            Register Image
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              Upload File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {file && <p>File chosen: {file.name}</p>}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
          </Box>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">{success}</Typography>}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterImage;
