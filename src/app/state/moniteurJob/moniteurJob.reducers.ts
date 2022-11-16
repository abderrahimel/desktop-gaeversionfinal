import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { sendMoniteurJobDataTOstore } from "./moniteurJob.actions";
import { initialState } from "./moniteurJob.state";


const _moniteurJobReducer = createReducer(initialState,
    on(sendMoniteurJobDataTOstore, (state, action)=>{
    return {...state,
        moniteurJob:{
            moniteurJob: action.data,
            loaded: true
        } 
            }
}), 
)

export function moniteurJobReducer(state, action){  
    return _moniteurJobReducer(state, action);
}
