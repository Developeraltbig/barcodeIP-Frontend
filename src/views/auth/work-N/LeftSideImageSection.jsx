import React from 'react'
import { CardMedia
} from '@mui/material';
// assets
import Logo from 'assets/images/barcodeip-logo.png';
import Icon from '../../../../public/favicon.ico';

function LeftSideImageSection() {
  return (
    <div
      className="col-sm-5 col-md-6 d-none d-md-flex flex-column justify-content-center p-5 position-relative"
      style={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white'
      }}
    >
      <div className="position-relative z-2" style={{ maxWidth: '550px' }}>
        <div className="mb-2 d-inline-block rounded-4 shadow-sm">
          <CardMedia component="img" image={Logo} alt="logo" sx={{ width: 180 }} />
        </div>
        <h1 className="display-4 fw-bold mb-3">Idea to IP</h1>
        <p className="fs-5 fw-light opacity-75">AI-powered patent search, drafting, and infringement analysis in one.</p>
      </div>
    </div>
  );
}

export default LeftSideImageSection
