import { createReducer, on } from "@ngrx/store";
import { loadVenteToStore, setloadedVente } from "./vente.actions";
import { initialState } from "./vente.state";

const _venteReducer = createReducer(initialState,
    on(loadVenteToStore, (state, action)=>{
    return {...state,
        vente: {
            vente:action.payload,
            loaded: true
        }
    };
}),
// 
on(setloadedVente, (state, action)=>{
return {...state,
    vente: {
        vente: state.vente.vente,
        loaded: false
    }
};
}),

)

export function venteReducer(state, action){
    return _venteReducer(state, action);
}