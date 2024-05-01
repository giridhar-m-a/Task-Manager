import "./App.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Login from "./Pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Pages/Register";
import Layout from "./Pages/Laoyut";
import Todo from "./Pages/Todo";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/app", element: <Todo /> },
    ],
  },
]);

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const userData = useSelector((state) => state.userAuth);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [darkMode, userData]);
  return <RouterProvider router={Routes} />;
}

export default App;
