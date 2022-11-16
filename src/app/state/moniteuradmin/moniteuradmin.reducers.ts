import { createReducer, on } from "@ngrx/store";
import {loadMoniteurAdminpayloadtostore } from "./moniteuradmi.action";
import { initialState } from "./moniteuradmin.state";

const _moniteuradminReducer = createReducer(initialState,
    on(loadMoniteurAdminpayloadtostore, (state, action)=>{
    return {...state,
        moniteuradmin:{
            moniteuradmin:{
                moniteuradmin: action.payload,
                loaded: true,
            }
        }
    };
}), 

)

export function moniteuradminReducer(state, action){
    return _moniteuradminReducer(state, action);
}