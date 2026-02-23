import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Paper, Container } from '@mui/material';

// MUI Icons
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const BRAND_RED = '#F04E23';

const NotFound = ({ error, resetErrorBoundary }) => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        bgcolor: '#fcfcfd',
        px: 3,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Background Elements */}
      <Box sx={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, bgcolor: 'rgba(240,78,35,0.03)', borderRadius: '50%', filter: 'blur(80px)' }} />
      <Box sx={{ position: 'absolute', bottom: -100, right: -100, width: 500, height: 500, bgcolor: 'rgba(30,41,59,0.03)', borderRadius: '50%', filter: 'blur(100px)' }} />

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 4, md: 6 }, 
              textAlign: 'center', 
              borderRadius: '32px', 
              border: '1px solid #e2e8f0',
              backdropFilter: 'blur(10px)',
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.04)'
            }}
          >
            {/* Animated Icon */}
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <Box 
                sx={{ 
                  display: 'inline-flex', 
                  p: 2, 
                  borderRadius: '24px', 
                  bgcolor: 'rgba(240, 78, 35, 0.08)', 
                  mb: 4 
                }}
              >
                <ErrorOutlineIcon sx={{ fontSize: 60, color: BRAND_RED }} />
              </Box>
            </motion.div>

            <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b', mb: 2, letterSpacing: '-0.02em' }}>
              Process Interrupted
            </Typography>

            <Typography variant="body1" sx={{ color: '#64748b', mb: 4, lineHeight: 1.6, fontSize: '1.1rem' }}>
              The system encountered an unexpected bottleneck while processing the patent analysis. 
              Our engineers have been notified.
            </Typography>

            {/* Error Detail Log (Only shown if error exists) */}
            {error && (
              <Box 
                sx={{ 
                  mb: 4, 
                  p: 2, 
                  bgcolor: '#f8fafc', 
                  borderRadius: '12px', 
                  border: '1px dashed #cbd5e1',
                  textAlign: 'left'
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', display: 'block', mb: 1, textTransform: 'uppercase' }}>
                  Technical Signature
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#e11d48', fontSize: '0.8rem', wordBreak: 'break-all' }}>
                  {error.message || "ERR_SYSTEM_TIMEOUT_RETRY"}
                </Typography>
              </Box>
            )}

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                startIcon={<ReplayIcon />}
                onClick={resetErrorBoundary || (() => window.location.reload())}
                sx={{ 
                  bgcolor: BRAND_RED, 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: '14px', 
                  fontWeight: 700,
                  boxShadow: `0 8px 20px ${BRAND_RED}40`,
                  '&:hover': { bgcolor: '#d83f1a', boxShadow: `0 12px 25px ${BRAND_RED}60` }
                }}
              >
                Try Again
              </Button>
              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                href="/"
                sx={{ 
                  color: '#475569', 
                  borderColor: '#cbd5e1', 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: '14px', 
                  fontWeight: 700,
                  '&:hover': { borderColor: '#94a3b8', bgcolor: '#f8fafc' }
                }}
              >
                Back Home
              </Button>
            </Box>

            <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <SupportAgentIcon sx={{ fontSize: 20, color: '#94a3b8' }} />
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                Need help? <a href="mailto:support@patentai.com" style={{ color: BRAND_RED, textDecoration: 'none', fontWeight: 700 }}>Contact Specialist</a>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default NotFound;