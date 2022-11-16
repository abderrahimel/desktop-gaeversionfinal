import { createFeatureSelector, createSelector } from "@ngrx/store";
import { VehiculeState } from "./vehicule.state";


const getVehiculesState = createFeatureSelector<VehiculeState>('vehicule');

// selector for moniteur theorique
export const getVehicules = createSelector(getVehiculesState, (state)=>{
    return state.vehicule.vehicule;
});
