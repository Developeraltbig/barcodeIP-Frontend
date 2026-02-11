import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/cards/MainCard';

// assets
import Logo from 'assets/images/barcodeip-logo.png';

// ==============================|| COMMON AUTH LAYOUT ||============================== //

export default function CommonAuthLayout({ title, subHeading, footerLink, children }) {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}
    >
      <Grid item xs={11} sm={8} md={5} lg={4}>
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <CardMedia
            component="img"
            image={Logo}
            alt="logo"
            sx={{ width: 160, mx: 'auto' }}
          />
        </Box>

        {/* Card */}
        <MainCard
            sx={{
              borderRadius: 4,
              background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',

              // 💥 HEAVY SHADOW
              boxShadow: `
                0 25px 50px rgba(0, 0, 0, 0.15),
                0 15px 30px rgba(0, 0, 0, 0.10),
                0 5px 15px rgba(0, 0, 0, 0.08)
              `,

              // subtle border glow
              border: '1px solid rgba(0, 0, 0, 0.05)',

              // smooth interaction
              transition: 'all 0.3s ease',

              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: `
                  0 35px 70px rgba(0, 0, 0, 0.18),
                  0 20px 40px rgba(0, 0, 0, 0.12),
                  0 10px 20px rgba(0, 0, 0, 0.10)
                `
              }
            }}
            contentSX={{
              px: { xs: 3, sm: 4 },
              py: 4
            }}
          >

          <Stack spacing={3} alignItems="center">
            {/* Title */}
            <Box textAlign="center">
              <Typography variant="h2" color="text.primary" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {subHeading}
              </Typography>
            </Box>

            {/* Form / Children */}
            <Box width="100%">
              {children}
            </Box>

            {/* Footer link */}
            {footerLink && (
              <Typography
                variant="subtitle2"
                component={Link}
                to={footerLink.link}
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                {footerLink.title}
              </Typography>
            )}
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}

CommonAuthLayout.propTypes = {
  title: PropTypes.string,
  subHeading: PropTypes.string,
  footerLink: PropTypes.object,
  children: PropTypes.node
};
