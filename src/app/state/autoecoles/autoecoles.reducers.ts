import { createReducer, on } from "@ngrx/store";
import {loadautoecolestostoreaction } from "./autoecoles.actions";
import { initialState } from "./autoecoles.state";



const _autoecolesReducer = createReducer(initialState,
    on(loadautoecolestostoreaction, (state, action)=>{
    return {...state,
        autoecoles:{
            autoecoles: action.payload,
            loaded: false
         }
    };
}), 
)

export function autoecolesReducer(state, action){
    return _autoecolesReducer(state, action);
}