import React, { useState } from 'react';
import { Box, Container, Typography, Fade } from '@mui/material';
import { PRODUCTS_DATA } from './data';
import TabComponent from './TabComponent';
import AnalysisView from './AnalysisView';
import SourcesSection from './SourcesSection';
import DiscoveredProducts from './DiscoveredProducts';

export default function Main() {
  const [activeProduct, setActiveProduct] = useState(PRODUCTS_DATA[0]);

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 8 , marginTop:'50px'}}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em' }}>
            Analysis Complete
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mt: 1, fontSize: '1.1rem' }}>
            Cross-referencing <strong>11 key features</strong> across the product ecosystem.
          </Typography>
        </Box>

        {/* Dynamic Carousel Tabs */}
        <TabComponent
          items={PRODUCTS_DATA} 
          activeId={activeProduct.id} 
          onSelect={setActiveProduct} 
        />

        {/* Unified Analysis Dashboard (The Big Box) */}
        <Fade in={true} key={activeProduct.id} timeout={600}>
          <Box sx={{ mb: 6 }}>
            <AnalysisView product={activeProduct} />
          </Box>
        </Fade>

        {/* Collapsible Section */}
        <SourcesSection />

        {/* Footer Sources */}
        <DiscoveredProducts />
      </Container>
    </Box>
  );
}