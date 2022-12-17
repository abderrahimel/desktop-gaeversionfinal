import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { loadExamensToStore, loadExamenToStore, removeExamenAction, setloadingToFalse } from "./examen.actions";
import { initialState } from "./examen.state";


const _examenReducer = createReducer(initialState,
    on(loadExamensToStore, (state, action)=>{
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
    console.log("set loading to false");
    return {...state,
        examen:{
            loaded:false,
            examen:null
        }
    };
}),

)

export function examenReducer(state, action){
    return _examenReducer(state, action);
}

// 