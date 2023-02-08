import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

// import './App.css';
import { NavBar, CategoryTabs } from 'components';
import { products } from 'mock';

const darkTheme = createTheme({
  palette: {
    mode: undefined,
  },
});

function App() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

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
