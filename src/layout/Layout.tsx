import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div className="app-class lg:block px-2 lg:px-0">
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
    </div>
  );
};

export default Layout;
