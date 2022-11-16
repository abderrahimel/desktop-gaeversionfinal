import { createReducer, on } from "@ngrx/store";
import { loadproduitCandidatToStore } from "./produitCandidat.actions";
import { initialState } from "./produitCandidat.state";

const _produitCandidatReducer = createReducer(initialState,
    on(loadproduitCandidatToStore, (state, action)=>{
    return {...state,
        produitCandidat: {
            produitCandidat: action.payload,
            loaded: true
        }
    };
}), 

)

export function produitCandidatReducer(state, action){
    return _produitCandidatReducer(state, action);
}