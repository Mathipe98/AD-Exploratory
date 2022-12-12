import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Buffer } from 'buffer';
import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { SERVER_ENDPOINTS } from '../config/constants';
import { useSelector } from '../store';
import { Image } from '../types/GenericTypes';
import { handleDelete } from '../utils/delete';
import {
  handleAuthorSearch,
  handleDateSearch,
  handleIdSearch,
  handleKeywordsSearch,
  handleTitleSearch
} from '../utils/search';

const theme = createTheme();

const SearchImages = () => {
  const [images, setImages] = useState<Image[]>([]);
  const token = useSelector((state) => state.auth.bearerToken);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Navigate/redirect user if token is empty
  if (!token || token === '') {
    return <Navigate to={'/'} />;
  }

  // Decode 'token' from base64
  const username = Buffer.from(token, 'base64').toString();

  const {
    deleteImageUrl,
    searchByTitle,
    searchById,
    searchByAuthor,
    searchByCreationDate,
    searchByKeywords
  } = SERVER_ENDPOINTS;

  const updateFeedback = (res: any) => {
    if (res) {
      setImages(res.data);
      setSuccessMsg('Search successful.');
      setErrorMsg('');
    } else {
      setSuccessMsg('');
      setErrorMsg('Search failed - response was empty.');
    }
  };

  const idSearch = async (event: FormEvent<HTMLFormElement>) => {
    const res = await handleIdSearch(event, searchById, token).catch((err) => {
      setErrorMsg(`ID-search failed: ${err.message}`);
      setSuccessMsg('');
    });
    updateFeedback(res);
  };

  const titleSearch = async (event: FormEvent<HTMLFormElement>) => {
    const res = await handleTitleSearch(event, searchByTitle, token).catch((err) => {
      setErrorMsg(`Title-search failed: ${err.message}`);
      setSuccessMsg('');
    });
    updateFeedback(res);
  };

  const authorSearch = async (event: FormEvent<HTMLFormElement>) => {
    const res = await handleAuthorSearch(event, searchByAuthor, token).catch((err) => {
      setErrorMsg(`Author-search failed: ${err.message}`);
      setSuccessMsg('');
    });
    updateFeedback(res);
  };

  const dateSearch = async (event: FormEvent<HTMLFormElement>) => {
    const res = await handleDateSearch(event, searchByCreationDate, token).catch((err) => {
      setErrorMsg(`Date-search failed: ${err.message}`);
      setSuccessMsg('');
    });
    updateFeedback(res);
  };

  const keywordsSearch = async (event: FormEvent<HTMLFormElement>) => {
    const res = await handleKeywordsSearch(event, searchByKeywords, token).catch((err) => {
      setErrorMsg(`Keywords-search failed: ${err.message}`);
      setSuccessMsg('');
    });
    updateFeedback(res);
  };

  const deleteImage = (id: number) => {
    // Take input from alert
    const input = prompt('Are you sure you want to delete this image? (y/n)');
    if (input === 'y') {
      handleDelete(deleteImageUrl, id, token)
        .then((res) => {
          setSuccessMsg(res.data.message);
          setErrorMsg('');
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
      <Container component="main">
        <CssBaseline />
        <Typography component="h1" variant="h5" sx={{ marginTop: 5 }}>
          Search by title, description, keywords, author, or creation date.
        </Typography>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <Box component="form" onSubmit={titleSearch} noValidate sx={{ mt: 1, marginRight: 5 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="title"
              label="Title"
              id="title"
              autoComplete="title"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Search
            </Button>
          </Box>
          <Box component="form" onSubmit={idSearch} noValidate sx={{ mt: 1, marginRight: 5 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="id"
              label="ID"
              id="id"
              autoComplete="id"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Search
            </Button>
          </Box>
          <Box component="form" onSubmit={authorSearch} noValidate sx={{ mt: 1, marginRight: 5 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="author"
              label="Author"
              id="author"
              autoComplete="author"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Search
            </Button>
          </Box>
          <Box component="form" onSubmit={dateSearch} noValidate sx={{ mt: 1, marginRight: 5 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="date"
              label="Creation Date"
              id="date"
              type="date"
              autoComplete="date"
              InputLabelProps={{ shrink: true }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Search
            </Button>
          </Box>
          <Box component="form" onSubmit={keywordsSearch} noValidate sx={{ mt: 1, marginRight: 5 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="keywords"
              label="Keywords (separated by commas)"
              id="keywords"
              autoComplete="keywords"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Search
            </Button>
          </Box>
          {successMsg && <Typography color="success">{successMsg}</Typography>}
          {errorMsg && <Typography color="error">Error: {errorMsg}</Typography>}
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

export default SearchImages;
