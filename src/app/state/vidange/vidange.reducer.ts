import { createReducer, on } from "@ngrx/store";
import { loadvidangeToStore } from "./vidange.actions";
import { initialState } from "./vidange.state";

const _vidangeReducer = createReducer(initialState,
    on(loadvidangeToStore, (state, action)=>{
    return {...state,
        vidange: {
            vidange:action.payload,
            loaded: true
        }
    };
}),
)

export function vidangeReducer(state, action){ 
    return _vidangeReducer(state, action);
}