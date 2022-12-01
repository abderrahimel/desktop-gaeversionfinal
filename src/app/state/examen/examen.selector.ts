import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ExamenState } from "./examen.state";


const getexamenState = createFeatureSelector<ExamenState>('examen');

export const getexamens = createSelector(getexamenState, (state:any)=>{
    return state.examen.examen;
})