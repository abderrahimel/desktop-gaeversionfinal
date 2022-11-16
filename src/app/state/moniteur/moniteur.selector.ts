import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MoniteurState } from "./moniteur.state";


const getMoniteurState = createFeatureSelector<MoniteurState>('moniteur');

// selector for moniteur theorique
export const getMoniteurT = createSelector(getMoniteurState, (state)=>{
    return state.moniteur.moniteurTheorique.moniteurTheorique
});

export const getLoadedOfMoniteurT = createSelector(getMoniteurState, (state)=>{
    return state.moniteur.moniteurTheorique.loaded
});
// selector for moniteur pratique
export const getMoniteurP = createSelector(getMoniteurState, (state)=>{
    return state.moniteur.moniteurPratique.moniteurPratique
});

export const getLoadedOfMoniteurP = createSelector(getMoniteurState, (state)=>{
    return state.moniteur.moniteurPratique.loaded
});