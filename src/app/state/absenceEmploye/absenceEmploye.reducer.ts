import { createReducer, on } from "@ngrx/store";
import { deletabsenceEmploye, loadedabsenceEmploye, setLoadingToFalse } from "./absenceEmploye.actions";
import { initialState } from "./absenceEmploye.state";

const _absenceEmployeReducer = createReducer(initialState,
    on(loadedabsenceEmploye, (state, action)=>{
    return {...state,
        absenceEmploye:{
            absenceEmploye:action.payload,
            loaded: true
        }
    };
}), 
on(deletabsenceEmploye, (state)=>{
    return {...state,
        absenceEmploye:{
            absenceEmploye: null,
            loaded: false
        }
    };
}),
on(setLoadingToFalse, (state)=>{
    return {...state,
        absenceEmploye:{
            absenceEmploye: state.absenceEmploye.absenceEmploye,
            loaded: false
        }
    };
}),

)

export function absenceEmployeReducer(state, action){
    return _absenceEmployeReducer(state, action);
}