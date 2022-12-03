import { createReducer, on } from "@ngrx/store";
import { loadassuranceToStore } from "./assurance.actions";
import { initialState } from "./assurance.state";

const _assuranceReducer = createReducer(initialState,
    on(loadassuranceToStore, (state, action)=>{
    return {...state,
        assurance: {
            assurance:action.payload,
            loaded: true
        }
    };
}),
)

export function assuranceReducer(state, action){ 
    return _assuranceReducer(state, action);
}