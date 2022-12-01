import { createAction, props } from "@ngrx/store";

export const loadMoniteurP = createAction("[moniteur] load moniteur pratique", props<{idAutoEcole:any}>());
export const loadMoniteurPratiqueTostore = createAction("[moniteur] load moniteur pratique to store", props<{payload:any}>());

export const deleteMoniteurP = createAction("[moniteur] delete moniteur pratique ", props<{id:any}>());
export const addMoniteurP = createAction("[moniteur] add moniteur pratique", props<{idAuto:any,payload:any}>());
export const updateMoniteurP = createAction("[moniteur] update moniteur pratique", props<{id:any,data:any}>());