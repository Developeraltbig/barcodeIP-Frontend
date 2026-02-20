import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// project imports
import ThemeCustomization from './themes';
import router from 'routes';

// auth imports
import { useCheckAuthQuery } from './features/slice/auth/authApi';
// import { setAuth, clearAuth } from './features/slice/auth/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullPageLoader from './components/FullPageLoader';

function App() {
  const dispatch = useDispatch();
  return (
    <ThemeCustomization>
      {/* 🔹 Move ToastContainer HERE inside the return block */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        // limit={3}
        // pauseOnFocusLoss={false}
        reverseOrder={false}
        theme="colored"
        style={{ zIndex: 999999 }} // 🔹 Set higher than your modals (99999)
      />
      <RouterProvider router={router} />
      {/* <FullPageLoader 
          colors={["#e06a50", "#33FF57", "#3357FF"]} // Red, Green, Blue
          label="Starting Dashboard..."  /> */}
    </ThemeCustomization>
  );
}

export default App;










































