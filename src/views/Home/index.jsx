import React, { useMemo } from 'react';
import DashboardWidgets from './DashboardWidgets';
import AdvanceSearch from './AdvanceSearch';
import KeyFeatures from './KeyFeatures';
import Banner3D from './Banner';
import RecentArticles from './RecentArticles';
import InputSectionN from './InputSectionN';
import { useGetLatestContentQuery } from '../../features/userApi';
import { Box, Typography } from '@mui/material';
import Banner from './Banner';

function Home() {
  
   // 1. Fetch data from API (passing default pagination if needed)
    const { data: LatestContent} = useGetLatestContentQuery();
   
    // 2. Safe Data Extraction
    const content = useMemo(() => {
      if (!LatestContent) return [];
      // Matches your API structure: { Articles: [...] }
      return LatestContent.data || LatestContent.article || (Array.isArray(LatestContent) ? LatestContent : []);
    }, [LatestContent]);

  return (
    <div style={{marginTop:'30px', }}>
      <Banner content={content} />
      <InputSectionN />
       {/* <KeyFeatures /> */}
      <DashboardWidgets />

      {/* <AdvanceSearch /> */}
     
      {/* <RecentArticles/> */}
    </div>
  );
}

export default Home;

//  backgroundColor:'#f7eaea'