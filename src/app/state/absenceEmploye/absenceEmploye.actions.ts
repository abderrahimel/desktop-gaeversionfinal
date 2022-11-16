import { createAction, props } from "@ngrx/store";


export const loadabsenceEmploye = createAction('[absenceEmploye] load absence to store',props<{idAutoEcole:any}>());
export const loadedabsenceEmploye = createAction('[absenceEmploye] loaded absence to store',props<{payload:any}>());
export const setLoadingToFalse = createAction('[absenceEmploye] set loading to false');
export const addabsenceEmployeAction = createAction('[absenceEmploye] add absence to store',props<{idAutoEcole:any, data:any}>());
export const updateabsenceEmployeAction = createAction('[absenceEmploye] update absence to store',props<{id:any, data:any}>());
export const redirectoRoutabsenceEmploye = createAction("[absenceEmploye] rout absence");
export const deleteabsenceEmployeById = createAction('[absenceEmploye] delete absence by id',props<{id:any}>());
export const deletabsenceEmploye = createAction('[absenceEmploye] delet absence from store');

