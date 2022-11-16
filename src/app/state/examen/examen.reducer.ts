import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { loadExamenToStore, removeExamenAction, setloadingToFalse } from "./examen.actions";
import { initialState } from "./examen.state";


const _examenReducer = createReducer(initialState,
    on(loadExamenToStore, (state, action)=>{
    return {...state,
        examen:{
            loaded:true,
            examen:action.payload
        }
    };
}), 
on(removeExamenAction, (state)=>{
    return {...state,
        examen:{
            loaded:false,
            examen:null
        }
    };
}),
on(setloadingToFalse, (state)=>{
    return {...state,
        examen:{
            loaded:false,
            examen:state.examen.examen
        }
    };
}),

)

export function examenReducer(state, action){
    return _examenReducer(state, action);
}

// 