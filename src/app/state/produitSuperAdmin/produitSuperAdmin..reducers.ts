import { createReducer, on } from "@ngrx/store";
import { loadProduitSuperAdmintostoreaction } from "./produitSuperAdmin.actions";
import { initialState } from "./produitSuperAdmin.state";


const _produitSuperAdminReducer = createReducer(initialState,
    on(loadProduitSuperAdmintostoreaction, (state, action)=>{
    return {...state,
        produitSuperAdmin: {
            produitSuperAdmin: action.payload,
            loaded: true
        }
    };
}), 
)

export function produitSuperAdminReducer(state, action){
    return _produitSuperAdminReducer(state, action);
}