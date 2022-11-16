import { createAction, props } from "@ngrx/store";


export const loadAbsence = createAction('[absence] load absence to store',props<{idAutoEcole:any}>());
export const loadedAbsence = createAction('[absence] loaded absence to store',props<{payload:any}>());
export const addAbsenceAction = createAction('[absence] add absence to store',props<{idAutoEcole:any, data:any}>());
export const updateAbsenceAction = createAction('[absence] update absence to store',props<{id:any, data:any}>());
export const redirectoRoutAbsence = createAction("[absence] rout absence");
export const deleteAbsenceById = createAction('[absence] delete absence by id',props<{id:any}>());
export const deletAbsences = createAction('[absence] delet absence from store');

