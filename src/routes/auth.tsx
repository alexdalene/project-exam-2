import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="grid min-h-svh place-content-center">
      <Outlet />
    </div>
  );
};

export default Auth;
