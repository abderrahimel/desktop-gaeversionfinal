import { createAction, props } from "@ngrx/store";


export const loadMoniteurT = createAction("[moniteur] load moniteur theorique",props<{idAutoEcole:any}>());
export const loadMoniteurToStore = createAction("[moniteur] load moniteur theorique", props<{payload:any}>());
export const loadMoniteurP = createAction("[moniteur] load moniteur pratique", props<{idAutoEcole:any}>());
export const removeMoniteurFromStore = createAction("[moniteur] remove moniteur");
export const loadMoniteurPtoStore = createAction("[moniteur] load moniteur pratique", props<{payload:any}>());
export const addMoniteurT = createAction("[moniteur] add moniteur theorique ", props<{idAuto:any,payload:any}>());
export const deleteMoniteurT = createAction("[moniteur] delete moniteur theorique ", props<{id:any}>());
export const deleteMoniteurP = createAction("[moniteur] delete moniteur pratique ", props<{id:any}>());
export const addMoniteurP = createAction("[moniteur] add moniteur pratique", props<{idAuto:any,payload:any}>());
export const updateMoniteurP = createAction("[moniteur] update moniteur pratique", props<{id:any,data:any}>());
export const updateMoniteurT = createAction("[moniteur] update moniteur Theorique", props<{id:any,data:any}>());

