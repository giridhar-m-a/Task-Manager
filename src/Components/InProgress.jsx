import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../Libraries/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const InProgress = () => {
  const queryClient = useQueryClient();
  const userData = useSelector((state) => state.userAuth);
  const handleChange = async (e, id) => {
    const taskStatus = e.target.value;
    try {
      await supabase.from("todo").update({ status: taskStatus }).eq("id", id);

      queryClient.invalidateQueries(["inprogress"]);
    } catch (error) {
      console.error("Error updating task status:", error.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const { data: inProgress, error } = await supabase
        .from("todo")
        .select("*")
        .eq("status", "progress")
        .eq("user_id", userData.userId);

      if (error) {
        throw error;
      }

      return inProgress;
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const { data: inProgress } = useQuery({
    queryKey: ["inProgress"],
    queryFn: fetchTasks,
  });
  return (
    <div className="px-14 pb-28">
      <div>
        <h1>Tasks</h1>
        <div className="flex flex-col gap-2">
          {inProgress?.map((task) => (
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
  );
};

export default InProgress;
