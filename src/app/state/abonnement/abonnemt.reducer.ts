import { createReducer, on } from "@ngrx/store";
import { initialState } from "./abonnement.state";
import { loadAbonnemtActiontostore } from "./abonnemet.action";

const _abonnemtReducer = createReducer(initialState,
    on(loadAbonnemtActiontostore, (state, action)=>{
    return {...state,
        abonnement:{
            abonnement: action.payload,
            loaded: true
        }
    };
}),


)

export function abonnemtReducer(state, action){
    return _abonnemtReducer(state, action);
}