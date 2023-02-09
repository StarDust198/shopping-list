import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

// import './App.css';
import { NavBar, CategoryTabs } from 'components';

const darkTheme = createTheme({
  palette: {
    mode: undefined,
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NavBar />
        <CategoryTabs />
        <Container maxWidth="sm"></Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
