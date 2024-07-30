import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { css, Global } from '@emotion/react';
import logo from '../../assets/logo2.png';

// Global styles for font import
const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');
  body {
    font-family: 'Josefin Sans', sans-serif;
  }
`;

// Define the pages for the navigation menu
const pages = ['Library', 'Collections', 'PokéGacha'];

// Define keyframes for gradient animation
const gradientAnimation = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

// Create a styled AppBar component with gradient animation
const AnimatedAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ff6b6b, #ffcc5c, #88d8b0, #6b6bff)',
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  fontFamily: 'Josefin Sans, sans-serif', 
  height: '80px',
  '@global': {
    ...gradientAnimation
  }
}));

// Define a styled Search component using Material UI's styling system
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

// Define a styled component for the search icon wrapper
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 1
}));

// Define a styled component for the search input field
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// Define the Navbar functional component
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate(); // Use useNavigate to handle navigation

  // Handle opening the navigation menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // Handle closing the navigation menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Handle logout logic
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <>
      {/* Apply global styles */}
      <Global styles={globalStyles} />
      <AnimatedAppBar position="static" sx={{ height: '80px' }}>
        <Container maxWidth={false} sx={{ pb: 0, mt: 1 }}>
          <Toolbar disableGutters>
            {/* Logo display for medium and larger screens */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Logo" src={logo} sx={{ width: '150px', height: 'auto', borderRadius: 0 }} />
              </IconButton>
            </Box>

            {/* Hamburger menu for small screens */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {/* Navigation menu for small screens */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <Avatar alt="Logo" src={logo} sx={{ width: '150px', height: 'auto', borderRadius: 0 }} />
            </Box>

            {/* Navigation buttons for medium and larger screens */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', my: 0 }, justifyContent: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    height: '100%',
                    mr: 3,
                    ml: 3,
                    color: 'white',
                    display: 'block',
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '17px',
                    border: '1px solid transparent',
                    '&:hover': {
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      cursor: 'pointer',
                    },
                    '&:active': {
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                    }
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* Search bar and logout button */}
            <Box sx={{ flexGrow: 0 }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Box>
            <Button color="inherit" sx={{ fontSize: '17px', fontFamily: 'Josefin Sans, sans-serif' }}>LogOut</Button>
          </Toolbar>
        </Container>
      </AnimatedAppBar>
    </>
  );
}

// Export the Navbar component as the default export
export default Navbar;