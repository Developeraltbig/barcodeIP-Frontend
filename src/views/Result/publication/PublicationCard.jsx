import React from 'react';
import { Box, Typography, Button, Stack, Paper, Chip, alpha } from '@mui/material';
import { Launch, CalendarMonth, Person, Visibility } from '@mui/icons-material';
import { COLORS } from '../constants';


const PublicationCard = ({ data, viewType }) => {
  const isList = viewType === 'list';

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '16px',
        border: '1px solid',
        borderColor: COLORS.BORDER,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: '0.3s',
        '&:hover': { boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: COLORS.TEXT_MAIN, lineHeight: 1.3 }}>
        {data.title}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Chip
          icon={<Launch sx={{ fontSize: '14px !important', color: COLORS.BRAND_RED }} />}
          label={data.id}
          size="small"
          sx={{ bgcolor: alpha(COLORS.BRAND_RED, 0.08), color: COLORS.BRAND_RED, fontWeight: 700, borderRadius: '6px' }}
        />
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: COLORS.TEXT_SUB }}>
          <CalendarMonth sx={{ fontSize: 18 }} />
          <Typography variant="caption" sx={{ fontWeight: 600 }}>{data.date}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: COLORS.TEXT_SUB }}>
          <Person sx={{ fontSize: 18 }} />
          <Typography variant="caption" sx={{ fontWeight: 600 }}>{data.author}</Typography>
        </Stack>
      </Stack>

      <Typography variant="body2" sx={{ color: COLORS.TEXT_SUB, lineHeight: 1.6, mb: 4, flexGrow: 1 }}>
        {data.desc}
      </Typography>

      {/* <Button
        variant="contained"
        startIcon={<Visibility />}
        sx={{
          bgcolor: COLORS.BRAND_RED,
          textTransform: 'none',
          borderRadius: '8px',
          width: 'fit-content',
          px: 3,
          fontWeight: 700,
          '&:hover': { bgcolor: '#c33b26' }
        }}
      >
        Overlap
      </Button> */}
    </Paper>
  );
};

export default PublicationCard;