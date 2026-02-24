import React, { useMemo } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Typography, Chip, Paper, IconButton, Button, Container, Stack } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const PATENT_ORANGE = '#F04E23';

const OverlapMatrix = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const passedData = location.state?.patentData;

  // 1. Markdown Parser Function
  const parseMarkdownTable = (mdString) => {
    if (!mdString || typeof mdString !== 'string') return [];

    const lines = mdString.trim().split('\n');
    // Filter out header separator line (the one with :---)
    const dataLines = lines.filter((line) => line.includes('|') && !line.includes(':---'));

    // The first line is the Header, the rest is data
    const [headerLine, ...rows] = dataLines;
    const headers = headerLine
      .split('|')
      .map((h) => h.trim())
      .filter(Boolean);

    return rows.map((row) => {
      const cells = row
        .split('|')
        .map((c) => c.trim())
        .filter(Boolean);
      return {
        feature: cells[0] || '',
        result: cells[1] || '',
        overlap: cells[2] || ''
      };
    });
  };

  // 2. Memoize the parsed data for performance
  const tableRows = useMemo(() => {
    const rawMatrix = passedData?.matrix;
    return parseMarkdownTable(rawMatrix);
  }, [passedData]);

  const excerpts = passedData?.excerpts || 'No relevant excerpts available.';

  if (!passedData) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No Data Found
        </Typography>
        <Button onClick={() => navigate(-1)} sx={{ color: PATENT_ORANGE }}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <div className="container-fluid bg-light min-vh-100 py-5" style={{ marginTop: '60px' }}>
      <div className="container">
        {/* HEADER SECTION */}
        <div className="row align-items-center mb-4">
           <Stack 
                direction="row" 
                alignItems="center" 
                spacing={1} 
                sx={{ mb: { xs: 1, sm: 2 }, cursor: 'pointer' }} 
                onClick={() => navigate(-1)}
              >
                <IconButton size="small" sx={{ color: '#64748b' }}>
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Back to Result
                </Typography>
              </Stack>

          <div className="col-md-8">
            <Typography variant="h4" fontWeight="800" sx={{ color: '#1e293b', mb: 1 }}>
              Analysis <span style={{ color: PATENT_ORANGE }}>Report</span>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comparison Patent: <strong>{id}</strong>
            </Typography>
          </div>
          <div className="col-md-4 d-flex justify-content-md-end">
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{ bgcolor: PATENT_ORANGE, borderRadius: '10px', '&:hover': { bgcolor: '#d83f1a' } }}
            >
              Download Report
            </Button>
          </div>
        </div>

        {/* DATA TABLE */}
        <Paper elevation={0} sx={{ border: '1px solid #ced0d1ff', borderRadius: '16px', overflow: 'hidden' }}>
          {/* Table Header (Desktop) */}
          <div className="row g-0 d-none d-md-flex bg-white border-bottom py-3 px-4">
            <div className="col-3">
              <Typography fontWeight="800" variant="subtitle2" color={PATENT_ORANGE}>
                KEY FEATURE
              </Typography>
            </div>
            <div className="col-7 text-center">
              <Typography fontWeight="800" variant="subtitle2" color={PATENT_ORANGE}>
                SEARCH RESULT
              </Typography>
            </div>
            <div className="col-2 text-end">
              <Typography fontWeight="800" variant="subtitle2" color={PATENT_ORANGE}>
                OVERLAP
              </Typography>
            </div>
          </div>

          {/* Render Parsed Rows */}
          {tableRows.length > 0 ? (
            tableRows.map((item, index) => (
              <div key={index} className="row g-0 border-bottom align-items-stretch bg-white">
                <div className="col-md-3 p-4 border-end" style={{ backgroundColor: '#fafafa' }}>
                  <Typography variant="body2" fontWeight="700" color="#334155">
                    {item.feature}
                  </Typography>
                </div>

                <div className="col-md-7 p-4">
                  <Typography variant="body2" color="#475569" sx={{ lineHeight: 1.7 }}>
                    {item.result}
                  </Typography>
                </div>

                <div className="col-md-2 p-4 d-flex justify-content-md-end align-items-start">
                  <Chip
                    label={item.overlap}
                    sx={{
                      fontWeight: 800,
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      bgcolor: item.overlap === 'Considerable' ? '#E8F5E9' : '#FFF9C4',
                      color: item.overlap === 'Considerable' ? '#2e7d32' : '#FBC02D'
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <Box sx={{ p: 5, textAlign: 'center' }}>
              <Typography color="text.secondary">Parsing failed or data is empty.</Typography>
            </Box>
          )}
        </Paper>

        {/* DYNAMIC RELEVANT EXCERPTS SECTION */}
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InfoOutlinedIcon sx={{ fontSize: 20, color: PATENT_ORANGE, mr: 1 }} />
            <Typography variant="h6" fontWeight="800" sx={{ color: '#1e293b', letterSpacing: 0.5 }}>
              RELEVANT EXCERPTS FROM PRIOR ART
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '16px',
              bgcolor: '#ffffff',
              border: '1px solid #e2e8f0',
              maxHeight: '600px',
              overflowY: 'auto',
              // Styling the internal HTML tags
              '& b': {
                color: '#1e293b',
                display: 'block', // Makes the headers (TECHNICAL FIELD, etc.) start on new lines
                marginTop: '20px',
                marginBottom: '8px',
                fontSize: '1rem',
                fontWeight: '900',
                textTransform: 'uppercase',
                borderLeft: `4px solid ${PATENT_ORANGE}`,
                paddingLeft: '12px'
              },
              '& b:first-of-type': {
                marginTop: '0px'
              }
            }}
          >
            {/* dangerouslySetInnerHTML allows the <b> tags to be rendered as HTML.
       We use white-space: pre-wrap to keep the paragraph breaks.
    */}
            <Typography
              variant="body1"
              component="div"
              sx={{
                color: '#475569',
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
                fontSize: '0.95rem',
                // 1. Force styling for the <b> tags inside the HTML
                '& b, & strong': {
                  fontWeight: 900, // Ensure it's extra bold
                  color: '#1e293b' // Darker color for contrast
                }
              }}
              dangerouslySetInnerHTML={{
                // 2. We use a fallback to empty string and ensure brackets are not escaped
                __html: excerpts
              }}
            />
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default OverlapMatrix;
