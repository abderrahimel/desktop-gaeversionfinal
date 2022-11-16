import { createAction, props } from "@ngrx/store";


export const loadCourTheorique = createAction('[cour] load cours theorique', props<{idAutoEcole:any}>());
export const loadCourPratique = createAction('[cour] load cours pratique', props<{idAutoEcole:any}>());
export const loadCourTheoriqueToStore = createAction('[cour] load cours theorique to store', props<{payload:any}>());
export const loadCourPratiqueToStore  = createAction('[cour] load cours pratique to store', props<{payload:any}>());
export const removeCourTheoriqueFromStore = createAction('[cour] remove cours theorique to store');
export const removeCourPratiqueFromStore  = createAction('[cour] remove cours pratique to store');
export const deleteCourTheoriqueById = createAction('[cour] delete cour theorique where id ', props<{id:any}>());
export const deleteCourPratiqueById = createAction('[cour] delete cour Pratique where id ', props<{id:any}>());

