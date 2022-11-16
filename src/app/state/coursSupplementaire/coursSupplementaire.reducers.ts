import { createReducer, on } from "@ngrx/store";
import { loadcoursSupplementaireToStore } from "./coursSupplementaire.actions";
import { initialState } from "./coursSupplementaire.state";

const _coursSupplementaireReducer = createReducer(initialState,
    on(loadcoursSupplementaireToStore, (state, action)=>{
    return {...state,
        coursRecette:{
            loaded: true,
            permis:  action.basic,
            coursSupplementaire:action.supplementaire
        }
    };
}), 

)

export function coursSupplementaireReducer(state, action){
    return _coursSupplementaireReducer(state, action);
}

