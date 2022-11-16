// loadcategoriedepenseToStore

import { createReducer, on } from "@ngrx/store";
import { loadcategoriedepenseToStore } from "./depenseCategorie.actions";
import { initialState } from "./depenseCategorie.state";

const _categorieDepenseReducer = createReducer(initialState,
    on(loadcategoriedepenseToStore, (state, action)=>{
    return {...state,
        depenseCategorie:{
            categorieLocal: action.local,
            categorieVehicule: action.vehicule,
            categoriePersonnel: action.personnel,
            loaded: true
        }
    };
}),
)

export function categorieDepenseReducer(state, action){
    return _categorieDepenseReducer(state, action);
}