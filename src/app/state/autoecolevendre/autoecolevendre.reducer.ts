import { createReducer, on } from "@ngrx/store";
import { loadautoecolevendretostore } from "./autoecolevendre.action";
import { initialState } from "./autoecolevendre.state";


const _autoecolevendreReducer = createReducer(initialState,
    on(loadautoecolevendretostore, (state, action)=>{
    return {...state,
        autoecolevendre:{
            autoecolevendre:{
                autoecolevendre: action.payload,
                loaded: true
            }
        }
    };
}), 



)

export function autoecolevendreReducer(state, action){
    return _autoecolevendreReducer(state, action);
}