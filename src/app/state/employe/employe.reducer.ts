import { createReducer, on } from "@ngrx/store";
import { deletEmployes, loadedEmploye, setloadingToFalse } from "./employe.action";
import { initialState } from "./employe.state";
// deleteEmployeFromStore

const _employeReducer = createReducer(initialState,
    on(loadedEmploye, (state, action)=>{
    return {...state,
        employe:{
            employe: action.payload,
            loaded: true
        }
    };
}), 
on(deletEmployes, (state)=>{
    return {...state,
        employe:{
            employe: null,
            loaded: false
        }
    };
}),
on(setloadingToFalse, (state)=>{
    return {...state,
        employe:{
            employe: state.employe.employe,
            loaded: false
        }
    };
}),

)

export function employeReducer(state, action){
    return _employeReducer(state, action);
}
// 