import { createReducer, on } from "@ngrx/store";
import { loadSuperAdminDataToStore } from "./dataSuperAdmin.actions";
import { initialState } from "./dataSuperAdmin.state";

const _SuperAdminReducer = createReducer(initialState,
    on(loadSuperAdminDataToStore, (state, action)=>{
    return {...state,
        dataSuperAdmin:{
            dataSuperAdmin: action.payload,
                loaded: true
            }
    };
}),
)

export function superAdminReducer(state, action){
    return _SuperAdminReducer(state, action);
}