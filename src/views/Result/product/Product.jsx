import React, { lazy, useEffect, useState } from 'react';
import Loadable from 'components/Loadable';
import { Box, Container, Typography, Fade } from '@mui/material';
import { PRODUCTS_DATA } from './data';
import NotFound from '../../../components/NotFound';
import { LinearProgress } from "@mui/material";

const TabComponent = Loadable(lazy(() => import('./TabComponent')));
const  AnalysisView  = Loadable(lazy(() => import('./AnalysisView')));
const  SourcesSection = Loadable(lazy(() => import('./SourcesSection')));
const  DiscoveredProducts = Loadable(lazy(() => import('./DiscoveredProducts')));


const Product = ({ data, progress }) => {
  // 1. Normalize the list of products from props

  const displayList = data?.results?.selectedTop5;


  // 2. State to track which product tab is clicked
  const [activeProduct, setActiveProduct] = useState(displayList[0]);

  const itemResult = data.results?.productCharts?.filter((product) => product.company === activeProduct.company)[0];

  // 3. Sync state if the 'data' prop changes from the parent
  useEffect(() => {
    if (displayList.length > 0) {
      setActiveProduct(displayList[0]);
    }
  }, [data]);

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 8 }}>
       

        {/* 4. Pass the list and the selection handler */}
        <TabComponent
          items={displayList}
          activeId={activeProduct?.id}
          onSelect={setActiveProduct}
        />

        {/* 5. AnalysisView now receives the specific object from the active tab */}
        {activeProduct && (
          <Fade in={true} key={activeProduct.id} timeout={600}>
            <Box sx={{ mb: 6 }}>
              <AnalysisView product={activeProduct} item={itemResult} />
            </Box>
          </Fade>
        )}

        {/* Collapsible Section */}
        <SourcesSection item={itemResult} />

        {/* Footer Sources */}
        <DiscoveredProducts item={data.results} />
    
    </Box>
  );
};

export default Product;
