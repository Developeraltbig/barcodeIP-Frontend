import React, { useMemo } from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { useGetLatestContentQuery } from '../../../features/userApi';

const Footer = () => {

  const { data: LatestContent } = useGetLatestContentQuery();

  // 2. Safe Data Extraction
  const content = useMemo(() => {
    if (!LatestContent) return [];
    // Matches your API structure: { Articles: [...] }
    return LatestContent.data || LatestContent.article || (Array.isArray(LatestContent) ? LatestContent : []);
  }, [LatestContent]);

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#222222',
        color: '#ffffff',
        pt: 6,
        pb: 3,
        width: '100%',
        mt: 'auto' // Pushes itself to the bottom of the flex container
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="flex-start" justifyContent="space-between">
          <Grid item size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '30px' }}>
                barcode
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#E94E34', fontSize: '30px' }}>
                IP
              </Typography>
              <Box component="span" sx={{ width: 6, height: 6, bgcolor: '#E94E34', borderRadius: '50%', ml: 0.5 }} />
            </Box>
          </Grid>

          <Grid item size={{ xs: 12, md: 2.5 , sm:4 }}>
            <Typography variant="caption" sx={{ color: '#888', fontWeight: 700 }}>
              CONTACT US
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, mt: 1 }}>
              {content.contact}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 3 , sm: 4 }}>
            <Typography variant="caption" sx={{ color: '#888', fontWeight: 700 }}>
              EMAIL
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, mt: 1 }}>
              {content.email}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 2.5 , sm:4 }}>
            <Typography variant="caption" sx={{ color: '#888', fontWeight: 700 }}>
              ADDRESS
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, mt: 1 }}>
              {content.address}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#666' }}>
            {content.copyright}
          </Typography>
          <Link href="#" underline="hover" sx={{ color: '#E94E34', fontSize: '0.75rem', fontWeight: 600 }}>
            Privacy
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
