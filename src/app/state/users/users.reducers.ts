import { createReducer, on } from "@ngrx/store";
import { loaduserstostoreaction } from "./users.actions";
import { initialState } from "./users.state";


const _usersReducer = createReducer(initialState,
    on(loaduserstostoreaction, (state, action)=>{
    return {...state,
        users: {
            users: action.payload,
            loaded: true
        }
    };
}), 
)

export function usersReducer(state, action){
    return _usersReducer(state, action);
}