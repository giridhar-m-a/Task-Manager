import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TaskInput from "../Components/TaskInput";
import TaskListing from "../Components/TasksListing";
import SideBar from "../Components/SideBar";

const Todo = () => {
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
        <div className="ml-[0.1rem] col-span-3">
          <TaskListing />
          <TaskInput />
        </div>
      </div>
    </>
  );
};

export default Todo;
