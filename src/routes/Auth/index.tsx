import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="grid min-h-[inherit] place-content-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
