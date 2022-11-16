import { createReducer, on } from "@ngrx/store";
import { loadAutoEcolesEnAttentetostore } from "./autoecolesEnAttente.actions";
import { initialState } from "./autoecolesEnAttente.state";


const _autoEcolesEnAttenteReducer = createReducer(initialState,
    on(loadAutoEcolesEnAttentetostore, (state, action)=>{
    return {...state,
        autoecolesEnAttente:{
            autoecolesEnAttente: action.payload,
            loaded: true
         }
    };
}), 
)

export function autoEcolesEnAttenteReducer(state, action){
    return _autoEcolesEnAttenteReducer(state, action);
}