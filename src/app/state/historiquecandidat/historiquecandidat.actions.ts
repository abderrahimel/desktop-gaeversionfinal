import { createAction, props } from "@ngrx/store";


export const loadhistoriquecandidat = createAction('[historiquecandidat] load historique candidat to store', props<{idAutoEcole: any}>());
export const loadedhistoriquecandidat = createAction('[historiquecandidat] loaded historique candidat to store', props<{payload: any}>());
export const removehistoriquecandidat = createAction('[historiquecandidat] remove historique candidat to store');
export const removehistoriquecandidatById = createAction('[historiquecandidat] remove historique candidat by id', props<{id:any}>());
export const removehistoriquecandidatByIdFromStateofhistorique = createAction('[historiquecandidat] remove historique candidat by id from the store', props<{id:any}>());
export const activehistoriquecandidat = createAction('[historiquecandidat] recuper archive candidat to store', props<{id: any}>());