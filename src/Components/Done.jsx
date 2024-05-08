import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../Libraries/client";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const Done = () => {
  const userData = useSelector((state) => state.userAuth);
  const fetchTasks = async () => {
    try {
      const { data: done, error } = await supabase
        .from("todo")
        .select("*")
        .eq("status", "done")
        .eq("user_id", userData.userId);

      if (error) {
        throw error;
      }

      return done;
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const { data: done } = useQuery({
    queryKey: ["done"],
    queryFn: fetchTasks,
  });
  return (
    <div className="px-14 pb-28">
      <div>
        <h1>Tasks</h1>
        <div className="flex flex-col gap-2">
          {done?.map((task) => (
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Done;
