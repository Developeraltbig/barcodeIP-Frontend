
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const AnalystReviewModal = ({ open, onClose, review }) => {
  if (!review) return null;

  // Helper to determine status colors
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return { color: '#2e7d32', bgColor: '#edf7ed', label: 'Completed' };
      case 'pending':
        return { color: '#ed6c02', bgColor: '#fff4e5', label: 'Pending' };
      default:
        return { color: '#0288d1', bgColor: '#e5f6fd', label: status || 'N/A' };
    }
  };

  const statusStyle = getStatusConfig(review.analystStatus);

  // Extract messages from the "analyst" array if it exists
  const analystMessages = review.analyst && Array.isArray(review.analyst) && review.analyst.length > 0
    ? review.analyst.map(a => a.message).filter(Boolean).join('\n\n')
    : null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' } }}
    >
      {/* Header with Close Button */}
      <DialogTitle sx={{ m: 0, p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <InfoOutlinedIcon sx={{ color: '#E94E34' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 800, color: '#1E293B' }}>
            Review Details
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#94a3b8' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 4, pb: 4 }}>
        {/* Project Header Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" sx={{ color: '#E94E34', fontWeight: 700, letterSpacing: 1.2 }}>
            Project Title
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A', mt: -0.5 }}>
            {review.project_title || 'Untitled Project'}
          </Typography>
        </Box>

        {/* Info Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
            mb: 4
          }}
        >
          <Box sx={{ p: 2, borderRadius: 2, border: '1px solid #f1f5f9', bgcolor: '#f8fafc' }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>
              CASE ID
            </Typography>
            <Typography
              variant="body2"
              noWrap
              sx={{
                color: '#9CA3AF',
                fontFamily: 'monospace',
                letterSpacing: '0.5px',
                fontSize: '0.85rem'
              }}
            >
              { review.case_id || review._id ? (review.case_id || review._id).split('-').pop() : 'N/A'}
            </Typography>
          </Box>

          <Box sx={{ p: 2, borderRadius: 2, border: '1px solid #f1f5f9', bgcolor: '#f8fafc' }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>
              STATUS
            </Typography>
            <Chip
              label={statusStyle.label}
              size="small"
              sx={{
                bgcolor: statusStyle.bgColor,
                color: statusStyle.color,
                fontWeight: 800,
                fontSize: '0.7rem',
                borderRadius: 1
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

        {/* Analyst Message Section */}
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700, color: '#475569' }}>
          Analyst Comments
        </Typography>
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            bgcolor: '#ffffff',
            border: '1px solid #e2e8f0',
            whiteSpace: 'pre-line',
            color: '#334155',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            minHeight: 120,
            boxShadow: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
          }}
        >
          {analystMessages || 'No additional analyst notes provided for this review.'}
        </Box>

        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 2, color: '#94a3b8', fontStyle: 'italic' }}>
          Review logged on: {new Date(review.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 3 }}>
        <Button
          onClick={onClose}
          fullWidth
          variant="contained"
          sx={{
            py: 1.5,
            bgcolor: '#1E293B',
            fontWeight: 700,
            borderRadius: 2,
            textTransform: 'none',
            '&:hover': { bgcolor: '#0F172A' }
          }}
        >
          Dismiss
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnalystReviewModal;