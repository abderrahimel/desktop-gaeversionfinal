import { createAction, props } from "@ngrx/store";

export const loadassurance = createAction('[assurance] load assurance', props<{idAuto:any}>());
export const loadassuranceToStore = createAction('[assurance] push assurance to store', props<{payload:any}>());