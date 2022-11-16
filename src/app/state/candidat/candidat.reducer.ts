import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { addCandidat, removeCandidat } from "./candidat.actions";
import { initialState } from "./candidat.state";


const _candidatReducer = createReducer(initialState,
    on(addCandidat, (state, action)=>{
    return {...state,
        candidat:{
            candidatBasic: action.candidatBasic,
            candidatSupplementaire: action.candidatSupplementaire,
            loaded: true
        }
    };
}), 
on(removeCandidat, (state)=>{
    return {...state,
        candidat:{
            candidatBasic: null,
            candidatSupplementaire: null,
            loaded: false
        }
    };
}),


)

export function candidatReducer(state, action){
    return _candidatReducer(state, action);
}