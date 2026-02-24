import React, { useState } from 'react';
import { Box, Typography, Card, Collapse, IconButton, Stack, Paper, Container } from '@mui/material';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'; // React Icons
import { MdOutlineExplore } from 'react-icons/md';

export default function DiscoveredProducts({item}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      {/* Header Section */}
      <Box 
        onClick={() => setIsOpen(!isOpen)}
        sx={{ 
          cursor: 'pointer', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
          p: 2,
          borderRadius: 3,
          '&:hover': { bgcolor: '#f8fafc' }
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <MdOutlineExplore color="#64748b" /> Additional Products Discovered
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: 3 }}>
            15 more products identified during discovery — not deeply analyzed
          </Typography>
        </Box>
        <IconButton sx={{ bgcolor: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </IconButton>
      </Box>

      {/* Collapsible Content */}
      <Collapse in={isOpen} timeout="auto">
        <div className="row g-4">
          {item.additionalProducts.map((product, index) => {
            return (
              <div key={index} className="col-12 col-md-6 col-lg-3">
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 2.5, 
                    height: '100%', 
                    borderRadius: 4, 
                    border: '1px solid #e0e0e7ff',
                    bgcolor: '#ffffff',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    '&:hover': { 
                      borderColor: '#ef4444',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', pr: 4 }}>
                      {product.name}
                    </Typography>
                  </Stack>

                  <Typography sx={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, mb: 1.5 }}>
                    {product.company}
                  </Typography>

                  <Typography sx={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    {product.description}
                  </Typography>
                </Card>
              </div>
            );
          })}
        </div>
      </Collapse>
    </Container>
  );
}