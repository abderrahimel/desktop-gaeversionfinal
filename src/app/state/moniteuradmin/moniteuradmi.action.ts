import { createAction, props } from "@ngrx/store";

export const loadMoniteurAdminAction = createAction('[moniteurs admin] load moniteurs radmin')
export const loadMoniteurAdminpayloadtostore = createAction('[moniteur admin]', props<{payload:any}>())