import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { loadedarchivecandidat, removearchivecandidat } from "./archivecandidat.actions";
import { initialState } from "./archivecandidat.state";


const _archivecandidatReducer = createReducer(initialState,
    on(loadedarchivecandidat, (state, action)=>{
    return {...state,
        archivecandidat:{
            archivecandidat: action.payload,
            loaded: true
        }
    };
}), 
on(removearchivecandidat, (state)=>{
    return {...state,
        archivecandidat:{
            archivecandidat: null,
            loaded: false
        }
    };
}),


)

export function archivecandidatReducer(state, action){
    return _archivecandidatReducer(state, action);
}