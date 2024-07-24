import { supabase } from "@/lib/client";
import { todo } from "@/types/types";

const GetToDo = async () => {
    try {
      const { data, error } = await supabase
        .from("todo")
        .select("*").order('end_date', {ascending: true})
        
      // .eq("user_id", userData.userId);

      if (error) {
        throw new Error(error.message);
      }
      const todo : todo[] = data;
      return todo;
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  export {GetToDo}