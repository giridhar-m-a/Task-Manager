import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SideBar from "../Components/SideBar";

const Application = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userAuth);
  useEffect(() => {
    if (!userData.Authenticated) {
      navigate("/");
    }
  }, [userData, navigate]);
  return (
    <>
      <div className="grid grid-cols-4 pt-24 ">
        <div className="col-span-1 w-full border-slate-800 h-screenHeight border-r-2">
          <div className="fixed grid grid-cols-1 bg-primary h-screenHeight bg-gray-800">
            <SideBar />
          </div>
        </div>
        <div className="col-span-3"></div>
      </div>
    </>
  );
};

export default Application;
