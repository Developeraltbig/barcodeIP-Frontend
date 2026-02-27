import React from 'react';
import DashboardWidgets from './DashboardWidgets';
import AdvanceSearch from './AdvanceSearch';
import KeyFeatures from './KeyFeatures';
import Banner3D from './Banner';
import RecentArticles from './RecentArticles';
import InputSectionN from './InputSectionN';

function Home() {
  return (
    <div style={{marginTop:'30px',}}>
      <Banner3D/>
      <InputSectionN />
      <DashboardWidgets />
      {/* <AdvanceSearch /> */}
      <KeyFeatures />
      <RecentArticles/>
    </div>
  );
}

export default Home;

//  backgroundColor:'#f7eaea'