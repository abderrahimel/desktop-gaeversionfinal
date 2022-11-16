import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { sendvehiculeOccasionDataTOstore } from "./vehiculeOccasion.actions";
import { initialState } from "./vehiculeOccasion.state";


const _vehiculeOccasionReducer = createReducer(initialState,
    on(sendvehiculeOccasionDataTOstore, (state, action)=>{
    return {...state,
        vehiculeOccasion:{
            vehiculeOccasion: action.data,
            loaded: true
        } 
            }
}), 
)

export function vehiculeOccasionReducer(state, action){
    return _vehiculeOccasionReducer(state, action);
}
