import { createAction, props } from "@ngrx/store";

export const loadvidange = createAction('[vidange] load vidange', props<{idAuto:any}>());
export const loadvidangeToStore = createAction('[vidange] push vidange to store', props<{payload:any}>());