import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormEvent, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { REGISTER_ENDPOINT, SERVER_ENDPOINTS } from '../config/constants';
import { useDispatch } from '../store';
import { setToken } from '../store/slices/auth';
import { apiPost } from '../utils/requests';

const theme = createTheme();

const Login = () => {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { loginUrl: loginApiUrl } = SERVER_ENDPOINTS;
  const registerUserEndpoint = REGISTER_ENDPOINT;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { username, password } = Object.fromEntries(data.entries());
    console.log({ username, password });

    // This part will be responsible for sending the data to the server
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    };
    const requestBody = new URLSearchParams({
      username: username as string,
      password: password as string
    });
    const response = await apiPost(loginApiUrl, requestBody, headers).catch((error) => {
      console.error(error);
      setErrorMsg('Invalid username or password');
    });
    // The following part is to check if the username-header value (which gets set by the server) actually
    // exists. If it does, then we update the state of the parent-component, namely App.tsx - so that it can
    // pass it down to its children (the other pages). If it doesn't exist, then we don't update the parent,
    // but we just show an alert that even though we logged in, the header did not get set properly
    const token = response?.headers['username'];
    if (token) {
      dispatch(setToken(token));
      setLoggedIn(true);
    }
  };

  return useMemo(() => {
    const result = loggedIn ? (
      <Navigate replace to="/" />
    ) : (
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
              Sign in
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
                Sign In
              </Button>
              {
                // Add an error message with red text if the login failed
                errorMsg && <Typography color="error">{errorMsg}</Typography>
              }
              <Grid container>
                <Grid item>
                  <Link href={registerUserEndpoint.route} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
    return result;
  }, [loggedIn, errorMsg]);
};

export default Login;
