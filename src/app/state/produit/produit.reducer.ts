import { createReducer, on } from "@ngrx/store";
import { loadProduitToStore } from "./produit.actions";
import { initialState } from "./produit.state";

const _produitReducer = createReducer(initialState,
    on(loadProduitToStore, (state, action)=>{
    return {...state,
        produit:{
            produit: action.payload,
            loaded: true
        }
    };
}), 

)

export function produitReducer(state, action){
    return _produitReducer(state, action);
}