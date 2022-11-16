import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { sendBoutiqueDataTOstore } from "./boutique.actions";
import { initialState } from "./boutique.state";


const _boutiqueReducer = createReducer(initialState,
    on(sendBoutiqueDataTOstore, (state, action)=>{
    return {...state,
             boutique:{
                boutique: action.data,
                loaded: true  
             }
            }
}), 
)

export function boutiqueReducer(state, action){
    return _boutiqueReducer(state, action);
}
