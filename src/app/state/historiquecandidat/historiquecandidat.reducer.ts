import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { loadedhistoriquecandidat, removehistoriquecandidat, removehistoriquecandidatByIdFromStateofhistorique } from "./historiquecandidat.actions";
import { initialState } from "./historiquecandidat.state";

// removehistoriquecandidat
const _historiquecandidatReducer = createReducer(initialState,
    on(loadedhistoriquecandidat, (state, action)=>{
    return {...state,
        historiquecandidat:{
            historiquecandidat: action.payload,
            loaded: true
        }
    };
}), 
on(removehistoriquecandidatByIdFromStateofhistorique, (state, action)=>{
    return {...state,
        historiquecandidat:{
            historiquecandidat: state.historiquecandidat.historiquecandidat.filter(historique => historique.id != action.id),
            loaded: true
        }
    };
}),
on(removehistoriquecandidat, (state)=>{
    return {...state,
        historiquecandidat:{
            historiquecandidat: null,
            loaded: false
        }
    };
})

)

export function historiquecandidatReducer(state, action){
    return _historiquecandidatReducer(state, action);
}