import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './components/404';
import NavBar from './components/NavBar';
import {
  GENERIC_CLIENT_ENDPOINTS,
  LOGIN_ENDPOINT,
  MENU_ENDPOINT,
  REGISTER_ENDPOINT
} from './config/constants';
import { useSelector } from './store';

function App() {
  const token = useSelector((state) => state.auth.bearerToken);

  const endpoints = GENERIC_CLIENT_ENDPOINTS;
  const login = LOGIN_ENDPOINT;
  const register = REGISTER_ENDPOINT;
  const menu = MENU_ENDPOINT;

  // Debug - remove later
  useEffect(() => {
    console.debug(`Token in App.tsx: ${token}`);
  }, [token]);

  const isLoggedIn = token.length > 0;

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar endpoints={isLoggedIn ? endpoints : [login, register]} />
        <Routes>
          <Route
            key={login.route}
            path={login.route}
            element={login.component()} // Pass updateToken-function down to the component as a callback function
          />
          <Route key={register.route} path={register.route} element={register.component()} />
          {endpoints.map((endpoint) => (
            <Route key={endpoint.route} path={endpoint.route} element={endpoint.component(token)} />
          ))}
          {isLoggedIn ? (
            <Route key={menu.route} path="/" element={menu.component(token)} />
          ) : (
            <Route key={menu.route} path="/" element={<Navigate to={login.route} />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
