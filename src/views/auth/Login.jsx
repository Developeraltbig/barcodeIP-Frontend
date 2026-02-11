// project imports
import CommonAuthLayout from './CommonAuthLayout';
import HomeN from './work-N/HomeN/HomeN';
import LoginN from './work-N/LoginN';
// import AuthLogin from 'sections/auth/AuthLogin';

// ==============================|| LOGIN ||============================== //

export default function Login() {
  return (
    <CommonAuthLayout
      title="Sign in"
      subHeading="To keep connected with us."
      // footerLink={{ title: 'Create a new account', link: '/register' }}
    >
      {/* Login form */}
      {/* <span><h3>Login</h3></span> */}
      {/* <AuthLogin /> */}
      <LoginN />
      <HomeN />
    </CommonAuthLayout>
  );
}
