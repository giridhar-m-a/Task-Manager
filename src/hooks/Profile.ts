import { supabase } from "@/lib/client";

const GetProfile = async()=>{
    try{
        const user = await supabase.auth.getUser();
        if(!user){
            throw new Error('Not logged in')
        }
        const {data, error} = await supabase.from('profiles').select('*').eq('id', user.data.user?.id).single();
        if(error){
            throw new Error(error.message);
        }
        return data;
    }catch(error){
        return error
    }
}

export {GetProfile}