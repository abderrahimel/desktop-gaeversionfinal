import { createReducer, on } from "@ngrx/store";
import { loadVenteToStore } from "./vente.actions";
import { initialState } from "./vente.state";

const _venteReducer = createReducer(initialState,
    on(loadVenteToStore, (state, action)=>{
        console.log("action.payload", action.payload);
    return {...state,
        vente: {
            vente:action.payload,
            loaded: true
        }
    };
})


)

export function venteReducer(state, action){
    return _venteReducer(state, action);
}