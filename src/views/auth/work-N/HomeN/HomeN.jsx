import React from 'react';
import InputSectionN from './inputSectionN';
import HeaderN from './headerN';
import DashboardWidgets from './DashboardWidgets';
import AdvanceSearch from './AdvanceSearch';
import KeyFeatures from './KeyFeatures';
import Footer from '../Footer/Footer';

function HomeN() {
  return (
    <div>
      <HeaderN />
      <InputSectionN />
      <DashboardWidgets />
      <AdvanceSearch />
      <KeyFeatures />
      <Footer/>
    </div>
  );
}

export default HomeN;
