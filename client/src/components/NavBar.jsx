import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white'
    },
    '&: hover fieldset': {
      borderColor: 'white'
    },
    '& input': {
      color: 'white'
    }
  }
});

const NavBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();
  const isRoutines = location.pathname === '/routines';

  const handleSearch = () => {
    console.log('Searching for', searchInput);
    setSearchInput('');
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h2" component="div" sx={{flexGrow: 1}}>
          HTC Fitness
        </Typography>
        {/* Render search bar only on routines page */}
        {isRoutines && (
          <Box sx={{alignItems: "center"}}>
            <CustomTextField
              variant="outlined"
              placeholder="Exercises..."
              size="small"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              onKeyDown={handleEnter}
              sx={{backgroundColor: "rgba(255, 255, 255, 0.1)"}}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{height: "40px", backgroundColor: "#1A237E"}}
              >
              Search
            </Button>
          </Box>
        )}
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/routines">Routines</Button>
          <Button color="inherit" component={Link} to="/goals">Goals</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;