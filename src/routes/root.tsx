import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div>
      <h1 className="font text-2xl font-bold text-primary">
        Hello, world!
      </h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
