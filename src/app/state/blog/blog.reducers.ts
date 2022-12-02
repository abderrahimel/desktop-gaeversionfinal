import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { initialState } from "./blog.state";
import { loadblogadmintostoreaction, setloadblog } from "./blog.actions";

const _blogReducer = createReducer(initialState,
    on(loadblogadmintostoreaction, (state, action)=>{
    return {...state,
        blog:{
            blog: action.payload,
            loaded: true
         }
    };
}), 
// setloadblog
on(setloadblog, (state)=>{
    return {...state,
        blog:{
            blog: null,
            loaded: false
         }
    };
}), 
)

export function blogReducer(state, action){
    return _blogReducer(state, action);
}