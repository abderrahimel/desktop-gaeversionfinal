
import { createReducer, on } from "@ngrx/store";
import { addAutoEcole, loadAutoecoletostore, removeAutoEcole } from "./autoEcole.actions";
import { initialState } from "./autoEcole.state";

const _autoEcoleReducer = createReducer(initialState,
    on(addAutoEcole, (state, action)=>{
    return {...state,
            autoEcole: action.payload
    };
}), 
on(removeAutoEcole, (state)=>{
    return {...state,
       autoEcole:{
        autoEcole:null,
        loaded:false
       }
    };
}),
on(loadAutoecoletostore, (state, action)=>{
    return   {...state,
        autoEcole:{
            autoEcole: action.payload,
            loaded: false
        }
    }
})
)

export function autoEcoleReducer(state, action){
    return _autoEcoleReducer(state, action);
}
