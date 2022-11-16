import { createAction, props } from "@ngrx/store";

export const loadAutoEcolesEnAttente = createAction('[AutoEcolesEnAttente] load Auto Ecoles En Attente'); 
export const loadAutoEcolesEnAttentetostore = createAction('[AutoEcolesEnAttente] load Auto Ecoles En Attente to store',props<{payload:any}>());