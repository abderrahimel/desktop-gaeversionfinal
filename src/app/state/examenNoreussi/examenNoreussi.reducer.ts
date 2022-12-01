import { createReducer, on } from "@ngrx/store";
import { loadExamenNoReussiToStore } from "./examenNoreussi.actions";
import { initialState } from "./examenNoreussi.state";


const _examenNoreussiReducer = createReducer(initialState,
    on(loadExamenNoReussiToStore, (state, action)=>{
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