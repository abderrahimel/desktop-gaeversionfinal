import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { sendautoEcoleWithAbonnementDataTOstore } from "./autoEcoleWithAbonnement.actions";
import { initialState } from "./autoEcoleWithAbonnement.state";


const _autoecolewithabonnementReducer = createReducer(initialState,
    on(sendautoEcoleWithAbonnementDataTOstore, (state, action)=>{
    return {...state,
      autoEcoleWithAbonnement:{
             autoEcoleWithAbonnement: action.data,
             loaded: true
         } 
            }
}), 
)

export function autoecolewithabonnementReducer(state, action){  
    return _autoecolewithabonnementReducer(state, action);
}
