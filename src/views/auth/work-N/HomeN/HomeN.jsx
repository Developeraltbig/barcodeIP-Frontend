import React from 'react';
import InputSectionN from './inputSectionN';
import HeaderN from './headerN';
import DashboardWidgets from './DashboardWidgets';
import AdvanceSearch from './AdvanceSearch';
import KeyFeatures from './KeyFeatures';

function HomeN() {
  return (
    <div>
      <HeaderN />
      <InputSectionN />
      <DashboardWidgets />
      <AdvanceSearch />
      <KeyFeatures />
    </div>
  );
}

export default HomeN;
