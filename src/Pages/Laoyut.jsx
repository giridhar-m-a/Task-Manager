import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screenHeight app-class">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
