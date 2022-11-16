import { createAction, props } from "@ngrx/store";


export const loadPaiment = createAction('[candidat paiment] load paiment candidats', props<{idAutoEcole:any}>());
export const loadedPaiment = createAction('[candidat paiment] loaded paiment candidats', props<{payload:any}>());
export const deletePaiment = createAction('[candidat paiment] delete paiment candidats');
export const addPaiment = createAction('[candidat paiment] add paiment candidats', props<{idAutoEcole:any,idCandidat:any, data:any}>());
export const updatePaiment = createAction('[candidat paiment] update paiment candidats', props<{idPaiment:any, data:any}>());
export const deletepaimentById = createAction('[candidat paiment] delete paiment candidats by id', props<{id:any}>());
export const updateIdCandidat = createAction('[candidat paiment] update Id Candidat', props<{id:any}>());