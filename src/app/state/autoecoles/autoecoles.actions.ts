import { createAction, props } from "@ngrx/store";

export const loadautoecoles = createAction('[autoecoles] load autoecoles'); 
export const loadautoecolestostoreaction = createAction('[autoecoles] load autoecoles to store',props<{payload:any}>());