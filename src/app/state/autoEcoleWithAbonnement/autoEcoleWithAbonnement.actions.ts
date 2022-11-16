import { createAction, props } from "@ngrx/store";

export const loadautoEcoleWithAbonnement =  createAction('[autoEcoleWithAbonnement] load autoEcoleWithAbonnement data');
export  const sendautoEcoleWithAbonnementDataTOstore = createAction('[autoEcoleWithAbonnement] load autoEcoleWithAbonnement data', props<{data:any}>());