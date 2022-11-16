import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { addUser, loginSuccess, removeUser } from "./user.actions";
import { initialState } from "./user.state";

const _userReducer = createReducer(initialState,
    on(addUser, (state, action)=>{
    return {...state,
           user:{
            user:action.payload,
            loaded:true
           }
    };
}), 
on(removeUser, (state)=>{
    return {...state,
       user:{
        user:null,
        loaded:false
       },
    };
}),
// access_token:string, expires_in: number, token_type: string
on(loginSuccess, (state, action)=>{
    let {access_token, token_type} = action;
    return {
        ...state,
        token: {access_token, token_type}
    };
})
)

export function userReducer(state, action){
    return _userReducer(state, action);
}