import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormEvent, useState } from 'react';
import { SERVER_ENDPOINTS } from '../config/constants';
import { apiPost } from '../utils/requests';

const theme = createTheme();

const RegisterUser = () => {
  const { registerUserUrl: apiRegisterUrl } = SERVER_ENDPOINTS;
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { username, password } = Object.fromEntries(data.entries());

    // This part will be responsible for sending the data to the server
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    };
    const requestBody = new URLSearchParams({
      username: username as string,
      password: password as string
    });
    apiPost(apiRegisterUrl, requestBody, headers)
      .then((response) => {
        console.log(JSON.stringify(response));
        setSuccessMsg(response.data.message);
        setErrorMsg('');
      })
      .catch((error) => {
        console.error(error);
        setErrorMsg('User registration failed: ' + error.message || error.toString());
        setSuccessMsg('');
      });
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
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
            {successMsg && <Typography color="success">{successMsg}</Typography>}
            {errorMsg && <Typography color="error">Error: {errorMsg}</Typography>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterUser;
