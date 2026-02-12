import React from 'react';
import { Box, Typography, Container, Card, CardContent, CardMedia, Link, Stack, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// --- Styled Components ---

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  border: '1px solid #E5E7EB',
  height: '100%',
  margin: '10px 5px', // Space for the shadow during 3D lift
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    borderColor: '#E94E34',
  },
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  color: '#333',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  '&:hover': { backgroundColor: '#fff', color: '#E94E34' },
  zIndex: 10,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
}));

// --- Sub-Components ---

const ArticleCard = ({ article }) => (
  <StyledCard elevation={0} style={{boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}>
    <CardMedia
      component="img"
      height="220"
      image={article.image}
      alt={article.title}
      sx={{ bgcolor: '#fff', objectFit: 'cover'  }}
    />
    <CardContent sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{article.title}</Typography>
      <Typography variant="body2" sx={{ color: '#666', mb: 4, height: '40px', overflow: 'hidden' }}>
        {article.description}
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="caption" sx={{ color: '#999', fontWeight: 600 }}>{article.date}</Typography>
        <Link href="#" sx={{ color: '#E94E34', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5, textDecoration: 'none' }}>
          View more <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Link>
      </Stack>
    </CardContent>
  </StyledCard>
);

const RecentArticles = () => {
  const articlesData = [
    { id: 1, title: 'Article 1', description: 'Insights into patent trends for 2025.', date: 'Nov 28, 2025', image: 'https://www.popoptiq.com/wp-content/uploads/2018/08/articles-lead-image-082418-min.jpg' },
    { id: 2, title: 'Article 2', description: 'Selective nerve stimulation breakthroughs.', date: 'Dec 05, 2025', image: 'https://www.popoptiq.com/wp-content/uploads/2018/08/articles-lead-image-082418-min.jpg' },
    { id: 3, title: 'Article 3', description: 'Understanding global IP protection.', date: 'Dec 12, 2025', image: 'https://www.popoptiq.com/wp-content/uploads/2018/08/articles-lead-image-082418-min.jpg' },
    { id: 4, title: 'Article 4', description: 'Future of AI in legal documentation.', date: 'Jan 02, 2026', image: 'https://www.popoptiq.com/wp-content/uploads/2018/08/articles-lead-image-082418-min.jpg' },
  ];

  return (
    <Box sx={{ bgcolor: '#f0ecec', py: 10, position: 'relative' }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#333' , fontSize:'40px'}}>Our Recent Articles</Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>Stay informed with our latest insights</Typography>
        </Box>

        {/* Swiper Carousel */}
        <Box sx={{ position: 'relative', px: { md: 6, xs: 0 }, paddingTop:'20px'}}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1} // Mobile default
            autoplay={{ delay: 5000 }}
            navigation={{
              nextEl: '.next-btn',
              prevEl: '.prev-btn',
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }, // Desktop: 3 cards in a row
            }}
            style={{ paddingBottom: '50px', paddingTop:'10px' }}
          >
            {articlesData.map((article) => (
              <SwiperSlide key={article.id}>
                <ArticleCard article={article} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <NavButton className="prev-btn" sx={{ left: -20 }}>
            <ArrowBackIosNewIcon fontSize="small" />
          </NavButton>
          <NavButton className="next-btn" sx={{ right: -20 }}>
            <ArrowForwardIosIcon fontSize="small" />
          </NavButton>
        </Box>
      </Container>

      {/* CSS Override for Swiper Pagination Color */}
      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-pagination-bullet-active { background: #E94E34 !important; }
      `}} />
    </Box>
  );
};

export default RecentArticles;