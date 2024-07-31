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
import { useNavigate, Link } from 'react-router-dom'; 
import logo from '../../assets/logo2.png';

// Define the pages for the navigation menu
const pages = ['Library', 'Battle', 'Evolutions'];

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

  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to right, #45b3e7, #bd559c)', height: '80px' }}>
      <Container maxWidth={false} sx={{ pb: 0, mt: 1 }}>
        <Toolbar disableGutters>
          {/* Logo display for medium and larger screens */}
          <Box sx={{ display: { XS: 'none', md: 'flex' }, alignItems: 'center' }}>
            <IconButton sx={{ p: 0 }} onClick={() => navigate('/')}>
              <Avatar alt="Remy Sharp" src={logo} sx={{ width: '150px', height: 'auto', marginLeft: '100px', borderRadius: 0 }} />
            </IconButton>
          </Box>

          {/* Hamburger menu for small screens */}
          <Box sx={{ flexGrow: 1, display: { XS: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
                display: { XS: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              {isLoggedIn && (
                <>
                  <MenuItem key="collections" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Collections</Typography>
                  </MenuItem>
                  <MenuItem key="logout" onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { XS: 'none', md: 'flex', my: 0 }, justifyContent: 'center' }}>
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
                <Link to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>{page}</Link>
              </Button>
            ))}
            {isLoggedIn && (
              <>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    height: '100%',
                    mr: 3,
                    ml: 3,
                    color: 'white',
                    display: 'block',
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
                  <Link to="/collections" style={{ textDecoration: 'none', color: 'inherit' }}>Collections</Link>
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            {isLoggedIn && (
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ ml: 2 }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;