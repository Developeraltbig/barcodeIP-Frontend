import React, { useMemo } from 'react';
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
import { useGetAllArticlesQuery } from '../../features/userApi';

// --- Styled Components ---

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '6px',
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

const ArticleCard = ({ article,strip }) => (
  <StyledCard elevation={0} style={{boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}>
    <CardMedia
      component="img"
      height="220"
      // image={article.image}
      image='https://media.istockphoto.com/id/902787158/photo/woman-hands-with-pen-writing-on-notebook-in-the-office.jpg?s=612x612&w=0&k=20&c=AFrTZ8bU1XrEifN4GU57k9PK8HYd3a3whGB_0pFp29E='
      alt={article.title}
      sx={{ bgcolor: '#fff', objectFit: 'cover'  }}
    />
    <CardContent sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{article.title}</Typography>
      <Typography variant="body2" sx={{ color: '#666', mb: 4, height: '40px', overflow: 'hidden' }}>
        {strip(article.description)}
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
  // 1. Fetch data from API (passing default pagination if needed)
    const { data: ArticleData, isLoading, isError } = useGetAllArticlesQuery();
  

  // 2. Safe Data Extraction
  const articles = useMemo(() => {
    if (!ArticleData) return [];
    // Matches your API structure: { Articles: [...] }
    return ArticleData.data || ArticleData.article || (Array.isArray(ArticleData) ? ArticleData : []);
  }, [ArticleData]);

  console.log(articles)

  // 3. Loading State
  if (isLoading) {
    return (
      <Box sx={{ py: 10, textAlign: 'center', bgcolor: '#f0ecec' }}>
        <Typography>Loading latest articles...</Typography>
      </Box>
    );
  }

   const stripHtml = (html) => {
        return html?.replace(/<[^>]*>?/gm, '') || "";
      }; 

  return (
    <Box sx={{ bgcolor: '#f0ecec', py: 10, position: 'relative' }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#333', fontSize: '40px' }}>
            Our Recent Articles
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Stay informed with our latest insights
          </Typography>
        </Box>

        {/* 4. Conditional Rendering: Show Swiper ONLY if articles exist */}
        {articles.length > 0 ? (
          <Box sx={{ position: 'relative', px: { md: 6, xs: 0 }, paddingTop: '20px' }}>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 5000 }}
              navigation={{
                nextEl: '.next-btn',
                prevEl: '.prev-btn',
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              style={{ paddingBottom: '50px', paddingTop: '10px' }}
            >
              {articles.map((article) => (
                <SwiperSlide key={article._id || article.id}>
                  <ArticleCard article={article} strip={stripHtml} />
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
        ) : (
          /* 5. No Data Found State */
          <Box sx={{ 
            p: 5, 
            textAlign: 'center', 
            border: '1px dashed #ccc', 
            borderRadius: '16px',
            bgcolor: 'rgba(255,255,255,0.5)' 
          }}>
            <Typography variant="h6" color="textSecondary">
              No articles found at the moment.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Check back soon for new updates!
            </Typography>
          </Box>
        )}
      </Container>

      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-pagination-bullet-active { background: #E94E34 !important; }
      `}} />
    </Box>
  );
};
export default RecentArticles;