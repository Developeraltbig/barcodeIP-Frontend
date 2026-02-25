import { Card, Chip, Paper } from "@mui/material";
import { Box, Container, Typography, Fade } from '@mui/material';
import PerformanceStats from '../product/PerformanceStats'; 

export default function AnalysisView({ product , item}) {
  // Ensure we have features to map over
  const features = product?.features || [];

  // Calculate stats based on the passed props
  const stats = {
    found: item?.finalChart?.mappings.filter((map) => map.status === "Found").length || 0,
    notFound: item?.finalChart?.mappings.filter((map) => map.status === "Not Found").length || 0,
    partial: item?.finalChart?.mappings.filter((map) => map.status === "Partial").length || 0,
    total: item?.finalChart?.mappings?.length || 0
  };

  return (
    <Card sx={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)', border: '1px solid #ef4444', pb: 4 }}>
      <Box sx={{ p: 5 }}>
        <div className="row g-5">
          <div className="col-lg-7">
            <Typography variant="h4" fontWeight={800}>
              {product.name}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Brand: <strong>{product.brand || product.company}</strong>
            </Typography>
            <Paper sx={{ p: 3, bgcolor: '#f8fafc', elevation: 0 }}>
              <Typography sx={{ lineHeight: 1.8 }}>{item?.finalChart?.summary || 'NA'}</Typography>
            </Paper>
          </div>

          <div className="col-lg-5">
            <Paper variant="outlined" sx={{ p: 4, borderRadius: 5, border: '1px dashed #ef4444' }}>
              <PerformanceStats stats={stats} />
            </Paper>
          </div>
        </div>
      </Box>

      <Container>
        {/* Table Header */}
        <Box className="row g-0 d-none d-lg-flex" sx={{ py: 2, bgcolor: '#fcfcfd', borderY: '1px solid #e2e8f0' }}>
          <div className="col-lg-3 px-4">
            <Typography variant="caption" fontWeight={900}>
              KEY FEATURES
            </Typography>
          </div>
          <div className="col-lg-4 px-4">
            <Typography variant="caption" fontWeight={900}>
              ANALYSIS
            </Typography>
          </div>
          <div className="col-lg-3 px-4">
            <Typography variant="caption" fontWeight={900}>
              EVIDENCE
            </Typography>
          </div>
          <div className="col-lg-2 px-4">
            <Typography variant="caption" fontWeight={900}>
              SOURCES
            </Typography>
          </div>
        </Box>

        {/* 6. Important: Map over the features array from props */}
        {item?.finalChart?.mappings?.map((feature, index) => (
          <Box key={index} className="row g-0 border-bottom">
            <div className="col-lg-3 p-3 border-end">
              <Typography variant="caption" sx={{ fontWeight: 900, color: '#ef4444' }}>
                {`0${index + 1}`}
              </Typography>
              <Typography fontWeight={700}>{feature.feature}</Typography>
            </div>

            <div className="col-lg-4 p-3 border-end">
              <Chip
                label={feature.status}
                size="small"
                sx={{
                  mb: 1,
                  fontWeight: 900,
                  bgcolor: '#fef2f2',
                  color: feature.status === 'Found' ? '#10b981' : '#ef4444'
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {feature.productAnalysis}
              </Typography>
            </div>

            <div className="col-lg-3 p-3 flex-column d-flex justify-content-center border-end">
              <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
                "{feature.supportingEvidence}"
              </Typography>
            </div>

            <div className="col-lg-2 p-3 flex-column d-flex justify-content-center">
              <Box sx={{ display: 'flex', gap: 1 }}>
                {feature?.sourceNumbers?.map((s) => {

                  const dynamicUrl = item?.finalChart?.urlMapping?.[s] || '#';

                  // console.log(`Source: ${s}, URL: ${dynamicUrl}`);

                  return (
                    <Chip
                      key={s}
                      label={`[${s}]`}
                      size="small"
                      variant="outlined"
                      clickable
                      component="a"
                      href={dynamicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()} // Prevents parent click (like accordion expansion)
                      sx={{
                        fontSize: '0.65rem',
                        cursor: 'pointer',
                        height:'50px',
                        width:'50px',
                        // bgcolor:'red',
                        borderRadius:'7px'
                      }}
                    />
                  );
                })}
              </Box>
            </div>
          </Box>
        ))}
      </Container>
    </Card>
  );
}
