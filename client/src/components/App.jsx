import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios'

import NavBar from './NavBar.jsx';
import HomePage from './HomePage.jsx';
import Goals from './Goals.jsx';
import Routines from './Routines.jsx';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: 'white',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
    },
  },
});

const App = () => {
  // detect user color preference
  // eslint-disable-next-line no-undef
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDarkMode ? darkTheme : lightTheme;

  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    axios.get('/api/exercises')
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage exercises={exercises} />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/goals" element={<Goals />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
