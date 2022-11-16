import { createAction, props } from "@ngrx/store";

export const loadVehiculeOccasion =  createAction('[vehiculeOccasion] load vehiculeOccasion data');
export  const sendvehiculeOccasionDataTOstore = createAction('[vehiculeOccasion] load vehiculeOccasion data', props<{data:any}>());