import { createReducer, on } from "@ngrx/store";
import { loadAutoEcolesApprovertostore } from "./autoecolesApprover.acttions";
import { initialState } from "./autoecolesApprover.state";


const _autoEcolesApproverReducer = createReducer(initialState,
    on(loadAutoEcolesApprovertostore, (state, action)=>{
    return {...state,
        autoecolesApprover:{
            autoecolesApprover: action.payload,
            loaded: true
         }
    };
}), 
)

export function autoEcolesApproverReducer(state, action){
    return _autoEcolesApproverReducer(state, action);
}