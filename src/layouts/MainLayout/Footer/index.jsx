

import React, { useMemo } from 'react';
import { Box, Container, Typography, Link, Divider, Stack, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X'; // Standard X (Twitter) icon in newer MUI
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { useGetLatestContentQuery } from '../../../features/userApi';

const Footer = () => {
  // ==========================================
  // LOGIC (Unchanged)
  // ==========================================
  const { data: LatestContent } = useGetLatestContentQuery();

  const content = useMemo(() => {
    if (!LatestContent) return [];
    return LatestContent.data || LatestContent.article || (Array.isArray(LatestContent) ? LatestContent : []);
  }, [LatestContent]);

  // ==========================================
  // UI STYLES
  // ==========================================
  const navLinkStyle = {
    color: '#94a3b8', // Grayish text
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'color 0.2s',
    '&:hover': {
      color: '#ffffff', // Turns white on hover
    }
  };

  const iconButtonStyle = {
    bgcolor: 'rgba(255, 255, 255, 0.05)', // Subtle background for icon squares
    color: '#94a3b8',
    borderRadius: '10px',
    p: 1,
    transition: 'all 0.2s',
    '&:hover': {
      bgcolor: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
    }
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1a1d27', // Dark navy/gray background from image
        color: '#94a3b8',
        pt: { xs: 4, md: 5 },
        pb: { xs: 3, md: 4 },
        width: '100%',
        mt: 'auto',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <Container maxWidth="xl">
        
        {/* TOP SECTION: Logo, Links, Socials */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: { xs: 4, md: 0 }
          }}
        >
          {/* 1. Logo */}
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '26px', color: '#ffffff' }}>
              barcode
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#E94E34', fontSize: '26px' }}>
              IP
            </Typography>
            <Typography sx={{ color: '#E94E34', fontSize: '26px', fontWeight: 800, lineHeight: 1 }}>
              .
            </Typography>
          </Box>

          {/* 2. Navigation Links */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 2, md: 5 }}
            alignItems="center"
          >
            <Link href="#" sx={navLinkStyle}>About Us</Link>
            <Link href="#" sx={navLinkStyle}>Terms of Service</Link>
            <Link href="#" sx={navLinkStyle}>Privacy Policy</Link>
            <Link href="#" sx={navLinkStyle}>Support</Link>
          </Stack>

          {/* 3. Social Icons */}
          <Stack direction="row" spacing={2}>
            <IconButton sx={iconButtonStyle}>
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton sx={iconButtonStyle}>
              <XIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        {/* THIN DIVIDER LINE */}
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', my: 4 }} />

        {/* BOTTOM SECTION: Copyright & Contact */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: 2
          }}
        >
          {/* Copyright Text (Uses API data if available, else fallback) */}
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            {content.copyright || '© 2026 BarcodeIP. All rights reserved.'}
          </Typography>

          {/* Contact Info (Uses API data if available, else fallback) */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 2, md: 4 }}
            alignItems="center"
          >
            {/* Email */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#94a3b8' }}>
              <MailOutlineIcon fontSize="small" sx={{ color: '#64748b' }} />
              <Typography variant="body2">
                {content.email || 'altbig@gmail.com'}
              </Typography>
            </Box>

            {/* Phone */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#94a3b8' }}>
              <PhoneOutlinedIcon fontSize="small" sx={{ color: '#64748b' }} />
              <Typography variant="body2">
                {content.contact || '+91 323 555 0174'}
              </Typography>
            </Box>
          </Stack>
        </Box>

      </Container>
    </Box>
  );
};

export default Footer;