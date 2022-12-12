import { makeStyles } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import { Theme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { NavBarProps } from '../types/NavBarTypes';

const useStyles = makeStyles((theme: Theme) => ({
  flexGrow: {
    flex: '1'
  },
  button: {
    color: 'white',
    my: 2,
    display: 'flex',
    backgroundColor: 'black'
  }
}));

const NavBar = (props: NavBarProps) => {
  const classes = useStyles();
  const endpoints = props.endpoints;
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}>
              {endpoints.map((endpoint) => (
                <MenuItem key={endpoint.displayName} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{endpoint.displayName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {endpoints.map((endpoint) => (
              <Button
                key={endpoint.displayName}
                className={classes.button}
                component={Link}
                to={endpoint.route}
                sx={{
                  color: 'white',
                  my: 2,
                  display: 'flex',
                  '&:hover': {
                    backgroundColor: '#fff',
                    color: '#3c52b2'
                  }
                }}>
                {endpoint.displayName}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
