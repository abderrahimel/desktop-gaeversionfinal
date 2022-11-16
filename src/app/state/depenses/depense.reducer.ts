import { createReducer, on } from "@ngrx/store";
import { loadDepenselocalToStore, loadDepensepersonnelToStore, loadDepensevehiculeToStore } from "./depense.actions";
import { initialState } from "./depense.state";

const _depenseReducer = createReducer(initialState,
    on(loadDepenselocalToStore, (state, action)=>{
    return {...state,
        depense:{
            local:{
                local: action.local,
                loaded: true
            },
            vehicule:{
                vehicule: state.depense.vehicule.vehicule,
                loaded: state.depense.vehicule.loaded
            },
            personnel:{
                personnel: state.depense.personnel.personnel,
                loaded: state.depense.personnel.loaded
            }
        }
    };
}), 
on(loadDepensevehiculeToStore, (state, action)=>{
    return {...state,
        depense:{
            local:{
                local: state.depense.local.local,
                loaded: state.depense.local.loaded
            },
            vehicule:{
                vehicule: action.vehicule,
                loaded: true
            },
            personnel:{
                personnel: state.depense.personnel.personnel,
                loaded: state.depense.personnel.loaded
            }
        }
    };
}),
on(loadDepensepersonnelToStore, (state, action)=>{
    return {...state,
        depense:{
            local:{
                local: state.depense.local.local,
                loaded: state.depense.local.loaded
            },
            vehicule:{
                vehicule: state.depense.vehicule.vehicule,
                loaded: state.depense.vehicule.loaded
            },
            personnel:{
                personnel: action.personnel,
                loaded: true
            }
        }
    };
}),

)

export function depenseReducer(state, action){
    return _depenseReducer(state, action);
}