import { createReducer, on } from "@ngrx/store";
import { loadedAbsenceMoniteurPratique } from "./absenceMoniteurPratique.actions";
import { initialState } from "./absenceMoniteurPratique.state";
// absence moniteur pratique
const _absenceMoniteurPratiqueReducer = createReducer(initialState,
    on(loadedAbsenceMoniteurPratique, (state, action)=>{
    return {...state,
        absenceMoniteurPratique:{
            absenceMoniteurPratique: action.payload,
            loaded: true
        }
        
    };
}),

)

export function absenceMoniteurPratiqueReducer(state, action){
    return _absenceMoniteurPratiqueReducer(state, action);
}