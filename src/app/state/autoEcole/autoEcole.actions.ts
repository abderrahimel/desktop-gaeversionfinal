import { createAction, props } from "@ngrx/store";
export const addAutoEcole = createAction('add auto ecole',
   props<{payload:any}>()
)
export const loadAutoecole = createAction('[auto ecole] load  auto ecole');
export const loadAutoecoletostore = createAction('[auto ecole] load  auto ecole', props<{payload:any}>());
export const removeAutoEcole = createAction('remove auto ecole');
