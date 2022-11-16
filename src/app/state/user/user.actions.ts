import { createAction, props } from "@ngrx/store";

export const addUser = createAction('add user',
   props<{payload:any}>()
);
export const removeUser = createAction('remove user');
export const loginStart = createAction('[user] login start',props<{email:string, password:string}>());
export const loginSuccess = createAction('[user] login success', props<{access_token:string, token_type: string}>());
export const loadingUser = createAction("[data] loading data");
export const loadAutoEcole = createAction("[data] loaded data", props<{id:any}>());
export const getUser = createAction("[data] get user data", props<{id:any}>());
