import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../Libraries/client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

const TaskInput = () => {
  const userData = useSelector((state) => state.userAuth);
  const queryClient = useQueryClient();
  const [task, setTask] = useState({
    task: "",
    end_date: "",
    user_id: userData.userId,
  });

  const handleClick = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("todo").insert([task]).select();
    console.log(data);
    console.log(error);
    setTask({
      task: "",
      end_date: "",
      user_id: userData.userId,
    });
    if (data) {
      queryClient.invalidateQueries(["tasks"]);
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    // console.log(task);
  };
  return (
    <form onSubmit={handleClick}>
      <div className="bg-secondary fixed bottom-0 grid gap-4 grid-cols-8 w-4/5 py-6 px-14">
        <div className="col-span-6 grid grid-cols-12">
          <div className="col-span-11">
            <input
              type="text"
              placeholder="Enter Task"
              className="w-full h-14 px-8 task focus:outline-none"
              required
              value={task.task}
              name="task"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <input
              type="date"
              placeholder="date"
              className="w-10 h-14 px-24 task-date"
              value={task.date}
              required
              name="end_date"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-span-2">
          <button className="h-14 w-3/5">
            <FontAwesomeIcon icon={faPlus} /> Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskInput;
