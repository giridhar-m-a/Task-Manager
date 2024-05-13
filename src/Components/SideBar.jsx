import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="border-r-2 border-secondary">
      <div className="w-96">
        <ul className="px-4 py-8 w-full">
          <li className="w-full hover:bg-secondary rounded-md mb-1">
            <Link to="/todo">
              <h5 className="text-title py-2 px-4">To Do</h5>
            </Link>
          </li>
          <hr />
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
