import { createAction, props } from "@ngrx/store";


export const loadAbonnemtAction = createAction('[abonnement] load abonnemt to state of the store');
export const loadAbonnemtActiontostore = createAction('[abonnement] load abonnemt to state abonnemt',props<{payload:any}>());
