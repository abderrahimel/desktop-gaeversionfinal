import { createReducer, on } from "@ngrx/store";
import { deletAbsences, loadedAbsence } from "./absence.actions";
import { initialState } from "./absence.state";

const _absenceReducer = createReducer(initialState,
    on(loadedAbsence, (state, action)=>{
    return {...state,
        absence:{
            absence:action.payload,
            loaded: true
        }
    };
}), 
on(deletAbsences, (state)=>{
    return {...state,
        absence:{
            absence: null,
            loaded: false
        }
    };
}),


)

export function absenceReducer(state, action){
    return _absenceReducer(state, action);
}