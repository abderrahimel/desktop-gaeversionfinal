import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DepenseState } from "./depense.state";


const getDepenseState = createFeatureSelector<DepenseState>('depense');


export const selectDepenseLocalById = (id:any) =>  {
    return createSelector(getDepenseState, (state)=>{
        return state.depense.local.local.filter.filter(dl=>dl.id === id);
    });
}