import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FF4B2B', // Vibrant Reddish-Orange
      light: '#FF8E53',
      dark: '#D43A1C',
    },
    success: {
      main: '#2e7d32',
    },
    background: {
      default: '#fcfcfc',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h6: { fontWeight: 700 },
  },
});