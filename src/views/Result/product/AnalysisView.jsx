import React from 'react';
import { Card, Box, Typography, LinearProgress, Stack, Chip, Paper, Container } from '@mui/material';
// import { FileText, Search } from 'lucide-react';

const Metric = ({ label, count, color }) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
      <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b' }}>{label}</Typography>
      <Typography sx={{ fontSize: '0.8rem', fontWeight: 800, color: color }}>{count}/11</Typography>
    </Box>
    <LinearProgress variant="determinate" value={(count / 11) * 100} sx={{ 
      height: 6, borderRadius: 3, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: color }
    }} />
  </Box>
);

export default function AnalysisView({ product }) {
  const stats = {
    found: product.features.filter(f => f.status === "FOUND").length,
    partial: product.features.filter(f => f.status === "PARTIAL").length,
    gap: product.features.filter(f => f.status === "NOT FOUND").length
  };

  return (
    <Card sx={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)' }}>
      {/* Top Part: Summary */}
      <Box sx={{ p: 5 , borderRadius:'10px', marginBottom:'25px' , borderTop: '1px solid #ced3d8ff' }}>
        <div className="row g-5">
          <div className="col-lg-7">
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
              {product.name}
            </Typography>
            <Typography sx={{ color: '#64748b', mb: 3 }}>
              Manufacturer: <strong>{product.brand}</strong>
            </Typography>
            <Box sx={{ p: 3, bgcolor: '#f8fafc' }}>
              <Typography sx={{ color: '#334155', lineHeight: 1.8 }}>{product.summary}</Typography>
            </Box>
          </div>
          <div className="col-lg-5">
            <Paper variant="outlined" sx={{ p: 4, borderRadius: 5, bgcolor: '#fff' ,border:'1px  dashed #ef4444' }}>
              <Metric label="FULL ALIGNMENT" count={stats.found} color="#10b981" />
              <Metric label="FULL ALIGNMENT" count={stats.partial} color="#a5a314ff" />
              <Metric label="TECHNOLOGY GAPS" count={stats.gap} color="#ef4444" />
              <Box sx={{ mt: 3, p: 1, bgcolor: '#fef2f2', color: '#ef4444', textAlign: 'center', borderTop:'1px solid #ced2d6ff' }}>
                <Typography sx={{ fontWeight: 900, fontSize: '0.75rem', }}>PRIORITY: {product.priority}</Typography>
              </Box>
            </Paper>
          </div>
        </div>
      </Box>

      {/* Bottom Part: The Table */}
      <Container sx={{ borderTop: '1px solid #f1f5f9' }}>
        {/* --- TABLE HEADER START --- */}
        <Box
          className="row g-0 d-none d-lg-flex"
          sx={{
            py: 2,
            borderTop: '1px solid #d7d9dbff',
            borderBottom: '1px solid #d7d9dbff',
            borderRadius:'2px',
            bgcolor: '#fcfcfd' // Subtle background to differentiate header
          }}
        >
          <div className="col-lg-3 px-4">
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>
              KEY FEATURES
            </Typography>
          </div>
          <div className="col-lg-4 px-4">
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>
              ANALYSIS
            </Typography>
          </div>
          <div className="col-lg-3 px-4">
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>
              EVIDENCE
            </Typography>
          </div>
          <div className="col-lg-2 px-4 text-end">
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>
              SOURCES
            </Typography>
          </div>
        </Box>
        {/* --- TABLE HEADER END --- */}

        {/* EXISTING DYNAMIC ROWS */}
        {product.features.map((feature) => (
          <Box key={feature.id} className="row g-0 border-bottom">
            <div className="col-lg-3 p-4 border-end" style={{ position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  bgcolor: feature.status === 'FOUND' ? '#10b981' : '#ef4444'
                }}
              />
              <Typography sx={{ fontWeight: 800, color: feature.status === 'FOUND' ? '#10b981' : '#ef4444' }}>{feature.id}</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{feature.title}</Typography>
            </div>

            <div className="col-lg-4 p-4 border-end">
              <Chip
                label={feature.status}
                size="small"
                sx={{
                  mb: 1.5,
                  fontWeight: 900,
                  bgcolor: feature.status === 'FOUND' ? '#ecfdf5' : '#fef2f2',
                  color: feature.status === 'FOUND' ? '#10b981' : '#ef4444'
                }}
              />
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                {feature.analysis}
              </Typography>
            </div>

            <div className="col-lg-3 p-4 border-end" style={{ bgcolor: '#fafafa' }}>
              <Typography
                sx={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}
              >
                EVIDENCE
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: '0.85rem' }}>
                "{feature.evidence}"
              </Typography>
            </div>

            <div className="col-lg-2 p-4 d-flex flex-wrap gap-1 align-content-center justify-content-end">
              {feature.sources.map((s) => (
                <Paper
                  key={s}
                  sx={{
                    px: 1,
                    py: 0.5,
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: '0.2s',
                    '&:hover': { bgcolor: '#ef4444', color: '#fff' }
                  }}
                >
                  [{s}]
                </Paper>
              ))}
            </div>
          </Box>
        ))}
      </Container>
    </Card>
  );
}