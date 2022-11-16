import { createReducer, on } from "@ngrx/store";
import { loadfacturesToStore } from "./factures.actions";
import { initialState } from "./factures.state";

const _factureReducer = createReducer(initialState,
    on(loadfacturesToStore, (state, action)=>{
    return {...state,
        factures:{
            factures: action.payload,
            loaded: true
        }
    };
}), 

)

export function factureReducer(state, action){
    return _factureReducer(state, action);
}