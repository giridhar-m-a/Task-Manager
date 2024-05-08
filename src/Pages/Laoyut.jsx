import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="app-class md:hidden hidden lg:block">
        <Outlet />
      </div>
      <div className="lg:hidden flex justify-center items-center h-dvh">
        <p>This app can't be opened in mobile or tablet</p>
      </div>
    </>
  );
};

export default Layout;
