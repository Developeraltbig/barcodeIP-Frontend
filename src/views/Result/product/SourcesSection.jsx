import React from 'react';
import { Box, Typography, Link, Stack, Paper, Divider, Container } from '@mui/material';
// import { ExternalLink, Link2 } from 'lucide-react';
import { FaLink } from "react-icons/fa6";

const SOURCES = [
  { id: 1, url: "https://semiconductor.samsung.com/processor/wearable-processor/exynos-w930/", domain: "samsung.com" },
  { id: 2, url: "https://www.gsmarena.com/samsung_galaxy_watch6_classic-12438.php", domain: "gsmarena.com" },
  { id: 3, url: "https://www.dcrainmaker.com/2023/08/samsung-galaxy-watch6-and-watch6-classic-in-depth-review-is-it-finally-accurate.html", domain: "dcrainmaker.com" },
  { id: 4, url: "https://www.notebookcheck.net/S6-vs-Exynos-W920-vs-Exynos-W930_12834_13823_15094.247596.0.html", domain: "notebookcheck.net" }
];

export default function SourcesSection() {
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
          {SOURCES.map((source) => (
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
                  '& .link-text': { color: '#ef4444' }, // Hover effect using your color
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
                    maxWidth: '85%'
                  }}>
                    {source.url}
                  </span>
                  < FaLink size={14} style={{ opacity: 0.5 }} />
                </Link>
              </Box>

              {/* Muted Domain Label (Desktop only) */}
              <Typography 
                variant="caption" 
                className="d-none d-md-block"
                sx={{ 
                  fontWeight: 700, 
                  color: '#94a3b8', 
                  textTransform: 'uppercase',
                  fontSize: '0.65rem',
                  ml: 2 
                }}
              >
                {source.domain}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
      
      {/* Footer Disclaimer */}
      {/* <Typography sx={{ mt: 3, textAlign: 'center', color: '#94a3b8', fontSize: '0.75rem' }}>
        Data verified as of February 2024. All technical specifications sourced from official manufacturer documentation and verified third-party analysis.
      </Typography> */}
    </Container>
  );
}