import { createReducer, on } from "@ngrx/store";
import { loadministerielleactionStore } from "./ministerielle.actions";
import { initialState } from "./ministerielle.sate";

const _ministerielleReducer = createReducer(initialState,
    on(loadministerielleactionStore, (state, action)=>{
    return {...state,
        ministerielle:{
            ministerielle:{
                ministerielle: action.payload,
                loaded: true,
            }
        }
    };
}), 


)

export function ministerielleReducer(state, action){
    return _ministerielleReducer(state, action);
}