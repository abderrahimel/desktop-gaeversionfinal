import { createReducer, on } from "@ngrx/store";
import { deletAbsences, loadedAbsence, setloadedAbsenceMoniteurTheorique } from "./absence.actions";
import { initialState } from "./absence.state";
// absence moniteur theorique
const _absenceReducer = createReducer(initialState,
    on(loadedAbsence, (state, action)=>{
    return {...state,
        absence:{
            absence:action.payload,
            loaded: true
        },
        
    };// absenceMoniteurPrarique
}), 
on(deletAbsences, (state)=>{
    return {...state,
        absence:{
            absence: null,
            loaded: false
        }
    };
}),
// 
on(setloadedAbsenceMoniteurTheorique, (state)=>{
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