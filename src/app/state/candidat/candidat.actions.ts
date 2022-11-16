import { createAction, props } from "@ngrx/store";

/** actions for candidat basic */
export const candidatSuccess = createAction('[user] login success', props<{access_token:string, token_type: string}>()); 
export const candidatStart = createAction('[candidat] candidat start',props<{idAutoEcole:any}>());
export const deleteCandidatById = createAction('[candidat] delete candidat by id',props<{id:any}>());
export const desactiveCandidatById = createAction('[candidat] desactive candidat by id',props<{id:any}>());
export const addCandidat = createAction('add candidat',
   props<{candidatBasic:any; candidatSupplementaire:any}>()
);
export const creatnewcandidat = createAction('[candidat] create candidat action', props<{idautoecole:any, data:any}>());
export const updatecandidat = createAction('[candidat] update candidat by id', props<{id:any, data:any}>())
export const removeCandidat = createAction('remove user');
export const redirectTocandidat = createAction('[candidat] redirection to list of candidat ');
export const redirectedToCandidat = createAction('[candidat] redirected to candidat');
export const setErrorMessage = createAction('error form', props<{message:any}>());
