import { createAction, props } from "@ngrx/store";

export const loadMoniteurJob =  createAction('[moniteurJob] load moniteurJob data');
export  const sendMoniteurJobDataTOstore = createAction('[moniteurJob] load moniteurJob data', props<{data:any}>());