import React, { useMemo } from 'react';
import { Box, Typography, Link, Stack, Paper, Divider, Container } from '@mui/material';
import { FaLink } from "react-icons/fa6";

export default function SourcesSection({ item }) { // Destructure item from props


  // 1. Transform the urlMapping object into an array
  const sources = useMemo(() => {
   
    const mapping = item?.urlMapping || item?.finalChart?.urlMapping || {};

    return Object.entries(mapping).map(([id, url]) => {
      // 2. Helper to extract domain name cleanly (e.g., "www.google.com" -> "google.com")
      let domain = '';
      try {
        const hostname = new URL(url).hostname;
        domain = hostname.replace('www.', '');
      } catch (e) {
        domain = 'External Source';
      }

      return { id, url, domain };
    });
  }, [item]);

  // Hide section if no sources exist
  if (!sources || sources.length === 0) return null;

  return (
    <Container sx={{ mt: 6, mb: 10 }}>
      {/* Header with Divider */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Typography 
          variant="overline" 
          sx={{ fontWeight: 900, color: '#0f0f0fff', letterSpacing: 1.5, fontSize: '0.75rem' }}
        >
          All Sources
        </Typography>
        <Divider sx={{ flexGrow: 1, opacity: 0.6 }} />
      </Stack>

      {/* Sources List */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 1, 
          borderRadius: 4, 
          border: '1px solid #d8dde2ff', 
          bgcolor: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <Stack spacing={0.5}>
          {sources.map((source) => (
            <Box 
              key={source.id}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                p: 1.5, 
                borderRadius: 3,
                transition: 'all 0.2s',
                '&:hover': { 
                  bgcolor: '#f8fafc',
                  '& .link-text': { color: '#ef4444' }, 
                  '& .source-index': { bgcolor: '#ef4444', color: 'white' }
                }
              }}
            >
              {/* Index Badge */}
              <Box 
                className="source-index"
                sx={{ 
                  width: 32, 
                  height: 32, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  borderRadius: 2, 
                  bgcolor: '#f1f5f9', 
                  color: '#475569', 
                  fontSize: '0.8rem', 
                  fontWeight: 800,
                  transition: '0.2s',
                  mr: 2,
                  flexShrink: 0
                }}
              >
                [{source.id}]
              </Box>

              {/* Link Content */}
              <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <Link 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer" // Security best practice
                  underline="none"
                  className="link-text"
                  sx={{ 
                    color: '#475569', 
                    fontSize: '0.9rem', 
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    transition: '0.2s'
                  }}
                >
                  <span style={{ 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    maxWidth: '85%',
                    display: 'block'
                  }}>
                    {source.url}
                  </span>
                  <FaLink size={14} style={{ opacity: 0.5, flexShrink: 0 }} />
                </Link>
              </Box>

              {/* Muted Domain Label (Desktop only) */}
              <Typography 
                variant="caption" 
                // Hide on small screens if using standard MUI breakpoints, otherwise remove class
                sx={{ 
                  display: { xs: 'none', md: 'block' },
                  fontWeight: 700, 
                  color: '#94a3b8', 
                  textTransform: 'uppercase',
                  fontSize: '0.65rem',
                  ml: 2,
                  whiteSpace: 'nowrap'
                }}
              >
                {source.domain}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Container>
  );
}