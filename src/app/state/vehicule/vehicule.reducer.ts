import { createReducer, on } from "@ngrx/store";
import {loadViheculeToStore, removeVehiculeAction } from "./vehicule.actions";
import { initialState } from "./vehicule.state";


const _vehiculeReducer = createReducer(initialState,
    on(loadViheculeToStore, (state, action)=>{
    return {...state,
        vehicule: {
            vehicule: action.payload,
            loaded: true
        }
    };
}), 
on(removeVehiculeAction, (state)=>{
    return {...state,
        vehicule:{
            vehicule: null,
            loaded:false
        }
    };
}),


)

export function vehiculeReducer(state, action){
    return _vehiculeReducer(state, action);
}