import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#D34335', // Brand color
    },
    background: {
      default: '#F8FAFC', // Modern soft grey
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A', // Deep slate
      secondary: '#64748B', // Muted slate
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h5: { fontWeight: 800, letterSpacing: '-0.02em' },
    h6: { fontWeight: 700, fontSize: '1rem', color: '#334155' },
    label: { fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' },
  },
  shape: { borderRadius: 12 },
});