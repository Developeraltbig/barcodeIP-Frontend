import { color } from "framer-motion";

export const BRAND_RED = "#E94E34";
export const BRAND_AMBER = "#F5A623";

export const outlineBtnStyle = { 
  textTransform: 'none', 
  borderRadius: '5px', 
  fontWeight: 700, 
  fontSize: '0.75rem', 
  color: '#E94E34', 
  border: ' 1px solid #E94E34' 
};

export const filledBtnStyle = { 
  textTransform: 'none', 
  borderRadius: '5px', 
  fontWeight: 700, 
  fontSize: '0.75rem', 
  bgcolor: BRAND_RED, 
  color: 'white',
  borderColor: 'white',
  '&:hover': { bgcolor: '#c53d29' } 
};

export const COLORS = { 
  textTransform: 'none', 
  borderRadius: '10px', 
  fontWeight: 700, 
  fontSize: '0.75rem', 
  bgcolor: BRAND_RED, 
  color: 'white',
  borderColor: 'white',
  '&:hover': { bgcolor: '#c53d29' } 
};