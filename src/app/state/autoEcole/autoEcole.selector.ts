import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AutoEcoleState } from "./autoEcole.state";


const getAutoEcoleState = createFeatureSelector<AutoEcoleState>('autoEcole');

export const getIdAutoEcole = createSelector(getAutoEcoleState, (state:any)=>{
    return state.autoecole.autoEcole;
})