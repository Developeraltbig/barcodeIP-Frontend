import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  Grid, 
  Divider, 
  useTheme, 
  useMediaQuery,
  Paper,
  Button
} from '@mui/material';
import { 
  CheckCircle as CheckIcon, 
  Cancel as CancelIcon, 
  Info as InfoIcon,
  ChevronRight,
  ChevronLeft
} from '@mui/icons-material';

// --- Configuration & Mock Data ---

const BRAND_COLOR = "#ef4444"; // Your requested color
const SECONDARY_COLOR = "#f3f4f6";

// Mock Data simulating the API response
const productsData = [
  {
    id: 'samsung-6',
    name: 'Samsung Galaxy Watch 6 Classic',
    manufacturer: 'Samsung',
    score: { found: 7, total: 11, partial: 0 },
    matchLevel: 'Medium',
    description: "The Samsung Galaxy Watch 6 Classic is a sophisticated health and fitness monitoring device. However, it is fundamentally different in its core physical design and power source, relying on a rigid chassis rather than flexible systems.",
    features: [
      {
        id: 1,
        title: "Self-power system using flexible thermoelectric module",
        status: "NOT FOUND",
        analysis: "This feature is not implemented. The device is powered by a conventional Li-ion battery (425mAh) and requires external charging.",
        evidence: "Battery specified as 'Li-Ion 425 mAh'. Charging method listed as '10W wireless'. Review notes 48 hours use before recharge."
      },
      {
        id: 2,
        title: "Uses flexible Skutterudite materials",
        status: "NOT FOUND",
        analysis: "Not present. As the watch does not use a thermoelectric self-powering system, it has no need for Skutterudite. Chassis is stainless steel.",
        evidence: "Build specified as 'Sapphire crystal front, stainless steel frame'. These materials are standard for premium watches."
      },
      {
        id: 3,
        title: "Integrates multiple biosensors",
        status: "FOUND",
        analysis: "The Galaxy Watch 6 Classic fully implements this feature through a comprehensive suite of integrated sensors.",
        evidence: "Specs list: Accelerometer, gyro, heart rate, barometer, altimeter, compass, SpO2, temperature (skin)."
      }
    ]
  },
  {
    id: 'whoop-4',
    name: 'Whoop 4.0',
    manufacturer: 'Whoop',
    score: { found: 8, total: 11, partial: 1 },
    matchLevel: 'High',
    description: "Whoop 4.0 focuses heavily on biosensing but lacks the specific thermoelectric capabilities defined in the invention.",
    features: [
      {
        id: 1,
        title: "Self-power system",
        status: "NOT FOUND",
        analysis: "Relies on battery packs.",
        evidence: "Battery pack accessory required for charging."
      }
    ]
  },
  {
    id: 'matrix-2',
    name: 'Matrix PowerWatch 2',
    manufacturer: 'Matrix Industries',
    score: { found: 7, total: 11, partial: 1 },
    matchLevel: 'High',
    description: "The closest market match. It actually utilizes thermoelectric technology to charge from body heat.",
    features: [
        {
          id: 1,
          title: "Self-power system",
          status: "FOUND",
          analysis: "Uses thermoelectric generators (TEG) to power the watch.",
          evidence: "Marketing claims 'Never Charge' due to body heat harvesting."
        }
    ]
  }
];

// --- Sub-Components ---

const StatusBadge = ({ status }) => {
  let bgColor, textColor, icon;

  switch (status) {
    case 'FOUND':
      bgColor = '#dcfce7'; // Light green
      textColor = '#166534'; // Dark green
      icon = <CheckIcon fontSize="small" />;
      break;
    case 'NOT FOUND':
      bgColor = '#fee2e2'; // Light red
      textColor = BRAND_COLOR; // Your Red
      icon = <CancelIcon fontSize="small" />;
      break;
    case 'PARTIAL':
      bgColor = '#fef3c7'; // Light orange
      textColor = '#92400e'; // Dark orange
      icon = <InfoIcon fontSize="small" />;
      break;
    default:
      bgColor = '#f3f4f6';
      textColor = '#374151';
  }

  return (
    <Chip 
      icon={icon} 
      label={status} 
      size="small"
      sx={{ 
        bgcolor: bgColor, 
        color: textColor, 
        fontWeight: 'bold',
        '& .MuiChip-icon': { color: textColor }
      }} 
    />
  );
};

const ProductTabCard = ({ product, isActive, onClick }) => (
  <Paper
    elevation={isActive ? 3 : 0}
    onClick={onClick}
    sx={{
      minWidth: 200,
      p: 2,
      mr: 2,
      cursor: 'pointer',
      border: isActive ? `2px solid ${BRAND_COLOR}` : '1px solid #e5e7eb',
      bgcolor: isActive ? '#fff' : '#f9fafb',
      borderRadius: 2,
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: isActive ? BRAND_COLOR : '#d1d5db',
        bgcolor: '#fff'
      }
    }}
  >
    <Box display="flex" alignItems="center" mb={1}>
        <Box 
            sx={{ 
                width: 24, height: 24, borderRadius: 1, 
                bgcolor: isActive ? BRAND_COLOR : '#ccc', 
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                mr: 1, fontSize: '0.8rem', fontWeight: 'bold'
            }}
        >
            {product.manufacturer[0]}
        </Box>
        <Typography variant="subtitle2" noWrap fontWeight="bold">
            {product.name}
        </Typography>
    </Box>
    <Typography variant="caption" color="text.secondary">
      {product.score.found}F / {product.score.partial}P / {product.score.total - product.score.found - product.score.partial}N
    </Typography>
  </Paper>
);

// --- Main Component ---

const Product = () => {
  const [activeProductId, setActiveProductId] = useState(productsData[0].id);
  const activeProduct = productsData.find(p => p.id === activeProductId);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        
        {/* Header Section */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight="800" color="#1e293b" gutterBottom>
            Analysis Complete
          </Typography>
          <Typography variant="body1" color="text.secondary">
            11 features mapped across {productsData.length} products
          </Typography>
        </Box>

        {/* Dynamic Product Tabs (Horizontal Scroll) */}
        <Box 
          sx={{ 
            display: 'flex', 
            overflowX: 'auto', 
            pb: 2, 
            mb: 3,
            // Hide scrollbar for cleaner look
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none' 
          }}
        >
          {productsData.map((product) => (
            <ProductTabCard 
              key={product.id}
              product={product}
              isActive={activeProductId === product.id}
              onClick={() => setActiveProductId(product.id)}
            />
          ))}
        </Box>

        {/* Main Content Area */}
        <Grid container spacing={3}>
          
          {/* Product Summary Card */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
                    <Box>
                        <Box display="flex" alignItems="center" gap={2} mb={1}>
                            <Chip 
                                label={activeProduct.matchLevel} 
                                sx={{ 
                                    bgcolor: '#fff7ed', 
                                    color: '#c2410c', 
                                    fontWeight: 'bold', 
                                    border: '1px solid #fdba74' 
                                }} 
                            />
                            <Typography variant="h5" component="h2" fontWeight="700">
                                {activeProduct.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                by {activeProduct.manufacturer}
                            </Typography>
                        </Box>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '800px', lineHeight: 1.6 }}>
                            {activeProduct.description}
                        </Typography>
                    </Box>
                    
                    {/* Score Badge */}
                    <Box sx={{ 
                        bgcolor: '#f1f5f9', 
                        px: 2, py: 1, 
                        borderRadius: 2, 
                        textAlign: 'right' 
                    }}>
                        <Typography variant="caption" display="block" color="text.secondary" fontWeight="bold">
                            MATCH SCORE
                        </Typography>
                        <Typography variant="h6" color={BRAND_COLOR} fontWeight="800">
                            {activeProduct.score.found} <span style={{fontSize: '0.8rem', color: '#64748b'}}>Found / {activeProduct.score.total}</span>
                        </Typography>
                    </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature Analysis Table/List */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                
                {/* Table Header - Hidden on Mobile */}
                {!isMobile && (
                    <Box sx={{ bgcolor: '#f8fafc', p: 2, borderBottom: '1px solid #e2e8f0' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}><Typography variant="subtitle2" fontWeight="bold" color="text.secondary">KEY FEATURE</Typography></Grid>
                            <Grid item xs={5}><Typography variant="subtitle2" fontWeight="bold" color="text.secondary">ANALYSIS</Typography></Grid>
                            <Grid item xs={4}><Typography variant="subtitle2" fontWeight="bold" color="text.secondary">EVIDENCE</Typography></Grid>
                        </Grid>
                    </Box>
                )}

                {/* Feature Rows */}
                {activeProduct.features.map((feature, index) => (
                    <Box key={feature.id}>
                        <Box sx={{ p: 3, bgcolor: 'white' }}>
                            <Grid container spacing={3}>
                                {/* Column 1: Feature Name */}
                                <Grid item xs={12} md={3}>
                                    <Box display="flex" gap={2} alignItems="flex-start">
                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>{index + 1}</Typography>
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="600" lineHeight={1.3} gutterBottom>
                                                {feature.title}
                                            </Typography>
                                            <StatusBadge status={feature.status} />
                                        </Box>
                                    </Box>
                                </Grid>

                                {/* Column 2: Analysis */}
                                <Grid item xs={12} md={5}>
                                    {isMobile && <Typography variant="caption" fontWeight="bold" color="text.secondary" display="block" mb={1}>ANALYSIS</Typography>}
                                    <Typography variant="body2" color="text.primary" lineHeight={1.6}>
                                        {feature.analysis}
                                    </Typography>
                                </Grid>

                                {/* Column 3: Evidence */}
                                <Grid item xs={12} md={4}>
                                    {isMobile && <Typography variant="caption" fontWeight="bold" color="text.secondary" display="block" mb={1}>EVIDENCE</Typography>}
                                    <Typography variant="body2" color="text.secondary" fontStyle="italic" sx={{ bgcolor: '#f8fafc', p: 1.5, borderRadius: 1, borderLeft: '3px solid #cbd5e1' }}>
                                        "{feature.evidence}"
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        {index < activeProduct.features.length - 1 && <Divider />}
                    </Box>
                ))}
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Product;