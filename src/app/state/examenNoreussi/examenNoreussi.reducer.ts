import { createReducer, on } from "@ngrx/store";
import { loadExamenNReussitostore } from "./examenNoreussi.actions";
import { initialState } from "./examenNoreussi.state";

const _examenNoreussiReducer = createReducer(initialState,
    on(loadExamenNReussitostore, (state, action)=>{
        console.log(action.payload);
    return {...state,
        examenNoreussi:{
            loaded:true,
            examenNoreussi:action.payload
        }
    };
}), 
)

export function examenNoreussiReducer(state, action){
    return _examenNoreussiReducer(state, action);
}