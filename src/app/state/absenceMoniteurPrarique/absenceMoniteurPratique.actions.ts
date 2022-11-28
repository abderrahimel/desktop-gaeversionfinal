import { createAction, props } from "@ngrx/store";


export const loadAbsenceMoniteurPratique = createAction('[absence] load absence moniteur pratique to store',props<{idAutoEcole:any}>());
export const loadedAbsenceMoniteurPratique = createAction('[absence] loaded absence moniteur pratique to store',props<{payload:any}>());