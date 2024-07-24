import { parse } from 'date-fns';

const GetDateString=(date:string)=>{
    return parse(date, 'yyyy-MM-dd', new Date());
}

export {GetDateString};