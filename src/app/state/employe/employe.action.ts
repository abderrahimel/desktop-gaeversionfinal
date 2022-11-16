import { createAction, props } from "@ngrx/store";


export const loadEmploye = createAction('[employe] load employe to store',props<{idAutoEcole:any}>());
export const loadedEmploye = createAction('[employe] loaded employe to store',props<{payload:any}>());
export const setloadingToFalse = createAction('[employe] set loading to false');
export const addEmployeAction = createAction('[employe] add employe to store',props<{idAutoEcole:any, data:any}>());
export const updateEmployeAction = createAction('[employe] update employe',props<{id:any, data:any}>());
export const redirectoRoutEmploye = createAction("[employe] rout employe");
export const deleteEmployeById = createAction('[employe] delete employe by id',props<{idEmploye:any}>());
export const deletEmployes = createAction('[employe] delet employe from store');
