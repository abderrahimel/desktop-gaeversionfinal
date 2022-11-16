import { createAction, props } from "@ngrx/store";


export const loadarchivecandidat = createAction('[archivecandidat] load archive candidat to store', props<{idAutoEcole: any}>());
export const loadedarchivecandidat = createAction('[archivecandidat] loaded archive candidat to store', props<{payload: any}>());
export const removearchivecandidat = createAction('[archivecandidat] remove archive candidat to store');
export const recuperarchivecandidat = createAction('[archivecandidat] recuper archive candidat to store', props<{id: any}>());