import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#D34335', // Brand Red
      light: '#FFF5F4',
    },
    background: {
      default: '#fdfdfdff', // Modern soft grey
      paper: '#f5f3f3ff',
    },
    text: {
      primary: '#0F172A', // Deep navy/grey for better readability
      secondary: '#64748B',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
    h5: { fontWeight: 700, letterSpacing: '-0.02em' },
    subtitle1: { fontWeight: 600 },
    caption: { fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' },
  },
  shape: { borderRadius: 9 },
});