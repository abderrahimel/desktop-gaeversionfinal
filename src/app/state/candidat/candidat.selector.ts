import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CandidatState } from "./candidat.state";


const getCandidatState = createFeatureSelector<CandidatState>('candidat');

export const getCandidatBasic = createSelector(getCandidatState, (state)=>{
    return state.candidat.candidatBasic;
});
export const getCandidatSupplementaire = createSelector(getCandidatState, (state)=>{
    return state.candidat.candidatSupplementaire;
}) 