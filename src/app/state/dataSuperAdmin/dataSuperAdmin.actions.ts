import { createAction, props } from "@ngrx/store";

export const loadSuperAdminData = createAction('[SuperAdminData] load Super Admin Data');
export const loadSuperAdminDataToStore = createAction('[SuperAdminData] load Super Admin Data to store', props<{payload:any}>());

