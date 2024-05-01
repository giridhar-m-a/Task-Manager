import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Todo = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userAuth);
  useEffect(() => {
    if (!userData.Authenticated) {
      navigate("/");
    }
  }, [userData, navigate]);
  return <h1>App</h1>;
};

export default Todo;
