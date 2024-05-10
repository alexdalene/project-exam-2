import Navbar from '@/components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-dvh">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
