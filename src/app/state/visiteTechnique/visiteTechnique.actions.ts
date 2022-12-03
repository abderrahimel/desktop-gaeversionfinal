import { createAction, props } from "@ngrx/store";

export const loadvisiteTechnique = createAction('[visiteTechnique] load visiteTechnique', props<{idAuto:any}>());
export const loadvisiteTechniqueToStore = createAction('[vente] push visiteTechnique to store', props<{payload:any}>());