import React from 'react';
import InputSectionN from './InputSectionN.jsx';
import HeaderN from './HeaderN.jsx';
import DashboardWidgets from './DashboardWidgets.jsx';
import AdvanceSearch from './AdvanceSearch.jsx';
import KeyFeatures from './KeyFeatures.jsx';
import Footer from '../Footer/Footer.jsx';

function HomeN() {
  return (
    <div>
      <HeaderN />
      <InputSectionN />
      <DashboardWidgets />
      <AdvanceSearch />
      <KeyFeatures />
      <Footer />
    </div>
  );
}

export default HomeN;
