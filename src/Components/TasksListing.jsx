import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../Libraries/client";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import InProgress from "./InProgress";
import Done from "./Done";

const TaskListing = () => {
  const userData = useSelector((state) => state.userAuth);
  const queryClient = useQueryClient();

  const handleChange = async (e, id) => {
    const taskStatus = e.target.value;
    try {
      await supabase.from("todo").update({ status: taskStatus }).eq("id", id);

      queryClient.invalidateQueries(["tasks"]);
    } catch (error) {
      console.error("Error updating task status:", error.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const { data: todo, error } = await supabase
        .from("todo")
        .select("*")
        .eq("status", "pending")
        .eq("user_id", userData.userId);

      if (error) {
        throw error;
      }

      return todo;
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const { data: todo } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  // const [todo, setTodo] = useState(undefined);
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const { data: todo, error } = await supabase
  //         .from("todo")
  //         .select("*")
  //         .eq("is_completed", false)
  //         .eq("is_in_progress", false)
  //         .eq("user_id", userData.userId);

  //       if (error) {
  //         throw error;
  //       }

  //       return todo;
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error.message);
  //     }
  //   };

  //   fetchTasks();
  // }, [userData]);

  // console.log(todo);

  const [activeButton, setActiveButton] = useState("To Do");
  const handleClick = (button) => {
    setActiveButton(button);
  };
  return (
    <div>
      <div className="flex justify-center relative">
        <ul className="flex gap-4 place-items-center rounded-lg bg-secondary px-8 mt-2 h-14 fixed">
          <li>
            <button
              onClick={() => handleClick("To Do")}
              className={activeButton === "To Do" ? "active" : "nav-button"}
            >
              To Do
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClick("In Progress")}
              className={
                activeButton === "In Progress" ? "active" : "nav-button"
              }
            >
              In Progress
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClick("Done")}
              className={activeButton === "Done" ? "active" : "nav-button"}
            >
              Done
            </button>
          </li>
        </ul>
      </div>
      <div className="pt-16">
        {activeButton === "To Do" && (
          <div className="px-14 pb-28">
            <div>
              <h1>Tasks</h1>
              <div className="flex flex-col gap-2">
                {todo?.map((task) => (
                  <div key={task.id} className="py-4 px-8 bg-secondary">
                    <div className="grid grid-cols-4">
                      <h4 className="col-span-3">{task.task}</h4>
                      <span className="flex gap-2 items-center justify-end">
                        <FontAwesomeIcon
                          icon={faCalendarDays}
                          style={{ color: "var(--color-text)" }}
                        />
                        End Date : {task.end_date}
                      </span>
                    </div>
                    <div className="pt-2">
                      <div className="flex gap-4 items-center">
                        <div>Status:</div>
                        <label className="flex items-center gap-2 ">
                          <input
                            type="checkbox"
                            className="checkbox border-slate-50"
                            value="progress"
                            onChange={(e) => handleChange(e, task.id)}
                          />
                          In Progress
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="checkbox"
                            value="done"
                            onChange={(e) => handleChange(e, task.id)}
                          />
                          Done
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeButton === "In Progress" && <InProgress />}
        {activeButton === "Done" && <Done />}
      </div>
    </div>
  );
};

export default TaskListing;
