import React from 'react';
import { Box, Typography, Chip, Paper, Stack, Divider, Container } from '@mui/material';
import { FiFileText } from "react-icons/fi";

const FEATURE_DATA = [
  {
    id: 1,
    title: "A self-power system using a flexible thermoelectric module to convert body heat into electricity",
    status: "NOT FOUND",
    analysis: "This feature is not implemented in the Samsung Galaxy Watch 6 Classic. The device is powered by a conventional, non-flexible lithium-ion battery with a capacity of 425mAh. The architecture is entirely dependent on its internal battery for all operations.",
    evidence: "The device's battery is specified as a 'Li-Ion 425 mAh' type. The charging method is listed as '10W wireless'. A review confirms it requires external charging, yielding about 48 hours of use.",
    sources: [2, 6, 7]
  },
  {
    id: 2,
    title: "Uses flexible Skutterudite materials for the extraction of body heat",
    status: "NOT FOUND",
    analysis: "This feature is not present. As the watch does not have a thermoelectric self-powering system, it has no need for and does not use Skutterudite or any similar thermoelectric materials. Construction materials are chosen for durability and aesthetics.",
    evidence: "The build is specified as having a 'Sapphire crystal front, stainless steel frame'. These materials are standard for premium watches and do not possess thermoelectric properties.",
    sources: [2, 7]
  },
  {
    id: 3,
    title: "Integrates multiple biosensors for real-time monitoring",
    status: "FOUND",
    analysis: "The Galaxy Watch 6 Classic fully implements this feature through a comprehensive suite of integrated sensors. The hardware includes an accelerometer, gyroscope, compass, barometer, and a thermometer for skin temperature.",
    evidence: "Specifications list sensors including 'Accelerometer, gyro, heart rate, barometer, altimeter, compass, SpO2, temperature (skin)'. A detailed review mentions the BioActive sensor.",
    sources: [2, 3, 6]
  }
];

const StatusBadge = ({ status }) => {
  const isFound = status === "FOUND";
  return (
    <Chip 
      label={status}
      size="small"
      sx={{ 
        fontWeight: 900, 
        fontSize: '0.65rem',
        // borderRadius: '1px',
        bgcolor: isFound ? '#ecfdf5' : '#fef2f2', // Light Red for Not Found
        color: isFound ? '#10b981' : '#ef4444',    // Your requested #ef4444
        border: `1px solid ${isFound ? '#10b98130' : '#ef444430'}`,
        mb: 1
      }} 
    />
  );
};

export default function AnalysisTable() {
  return (
    <Container >
      {/* Table Header (Bootstrap Grid) */}
      <Box className="row px-4 py-2 mb-2 d-none d-lg-flex" sx={{ opacity: 0.6 }}>
        <div className="col-lg-3"><Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1 }}>KEY FEATURE</Typography></div>
        <div className="col-lg-4"><Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1 }}>ANALYSIS</Typography></div>
        <div className="col-lg-3"><Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1 }}>EVIDENCE</Typography></div>
        <div className="col-lg-2 text-end"><Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1 }}>SOURCES</Typography></div>
      </Box>

      {/* Rows */}
      <Stack spacing={2}>
        {FEATURE_DATA.map((item) => {
          const isFound = item.status === "FOUND";
          return (
            <Paper 
              key={item.id}
              elevation={0}
              sx={{ 
                borderRadius: 4, 
                overflow: 'hidden', 
                border: '1px solid #e2e8f0',
                position: 'relative',
                transition: '0.2s',
                '&:hover': { boxShadow: '0 8px 20px rgba(0,0,0,0.04)', borderColor: '#cbd5e1' }
              }}
            >
              {/* Status Side-Accent */}
              <Box sx={{ 
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, 
                bgcolor: isFound ? '#10b981' : '#ef4444' 
              }} />

              <div className="row g-0 align-items-stretch">
                {/* Feature Title */}
                <div className="col-lg-3 p-4 border-end" style={{ backgroundColor: '#fcfcfd' }}>
                  <Stack direction="row" spacing={1.5}>
                    <Typography sx={{ fontWeight: 900, color: isFound ? '#10b981' : '#ef4444', fontSize: '0.9rem' }}>
                      {item.id.toString().padStart(2, '0')}
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.4 }}>
                      {item.title}
                    </Typography>
                  </Stack>
                </div>

                {/* Analysis Body */}
                <div className="col-lg-4 p-4 border-end">
                  <StatusBadge status={item.status} />
                  <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
                    {item.analysis}
                  </Typography>
                </div>

                {/* Evidence Section */}
                <div className="col-lg-3 p-4 border-end" style={{ backgroundColor: '#f8fafc' }}>
                  <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1, fontWeight: 700, color: '#64748b' }}>
                    <FiFileText Textsize={14} /> 
                    TECHNICAL EVIDENCE
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#64748b', fontSize: '0.85rem' }}>
                    "{item.evidence}"
                  </Typography>
                </div>

                {/* Sources */}
                <div className="col-lg-2 p-4 d-flex flex-column justify-content-center align-items-end">
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'flex-end' }}>
                    {item.sources.map(s => (
                      <Box 
                        key={s}
                        sx={{ 
                          width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          borderRadius: 1, bgcolor: '#f1f5f9', color: '#475569', fontSize: '0.75rem', fontWeight: 800,
                          cursor: 'pointer', border: '1px solid #e2e8f0',
                          '&:hover': { bgcolor: '#ef4444', color: 'white', borderColor: '#ef4444' }
                        }}
                      >
                        [{s}]
                      </Box>
                    ))}
                  </Box>
                  <Typography sx={{ mt: 2, fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                    Verified Data
                  </Typography>
                </div>
              </div>
            </Paper>
          );
        })}
      </Stack>
    </Container>
  );
}