import { createAction, props } from "@ngrx/store";

export const loadBoutique =  createAction('[boutique] load boutique data');
export  const sendBoutiqueDataTOstore = createAction('[boutique] load boutique data', props<{data:any}>());