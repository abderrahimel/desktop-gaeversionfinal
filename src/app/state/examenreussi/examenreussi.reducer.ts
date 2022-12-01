import { createReducer, on } from "@ngrx/store";
import { loadExamenReussiToStore, removeExamenReussiAction, setloadingToFalse } from "./examenreussi.actions";
import { initialState } from "./examenreussi.state";


const _examenreussiReducer = createReducer(initialState,
    on(loadExamenReussiToStore, (state, action)=>{
    return {...state,
        examenreussi:{
            loaded:true,
            examenreussi:action.payload
        }
    };
}), 
on(removeExamenReussiAction, (state)=>{
    return {...state,
        examenreussi:{
            loaded:false,
            examenreussi:null
        }
    };
}),
on(setloadingToFalse, (state)=>{
    return {...state,
        examenreussi:{
            loaded:false,
            examenreussi:state.examenreussi.examenreussi
        }
    };
}),

)

export function examenreussiReducer(state, action){
    return _examenreussiReducer(state, action);
}