import { createReducer, on } from "@ngrx/store";
import { loadMoniteurPtoStore, loadMoniteurToStore, removeMoniteurFromStore } from "./moniteur.actions";
import { initialState } from "./moniteur.state";

const _moniteurReducer = createReducer(initialState,
    // case : moniteur theorique
    on(loadMoniteurToStore, (state, action)=>{
    return {...state,
            moniteur:{
                moniteurTheorique:{
                    moniteurTheorique: action.payload,
                    loaded: true,
                },
                moniteurPratique: {
                    moniteurPratique: state.moniteur.moniteurPratique.moniteurPratique,
                    loaded: state.moniteur.moniteurPratique.loaded,
                },
            }
    };
}), 
// case: moniteur pratique
on(loadMoniteurPtoStore, (state, action)=>{
    return {...state,
            moniteur:{
                moniteurTheorique:{
                    moniteurTheorique: state.moniteur.moniteurTheorique.moniteurTheorique,
                    loaded: state.moniteur.moniteurTheorique.loaded,
                },
                moniteurPratique: {
                    moniteurPratique: action.payload,
                    loaded: true,
                },
            }
    };
}),
// case : remove moniteur 
on(removeMoniteurFromStore, (state)=>{
    return {...state,
         moniteur:{
            moniteurTheorique:{
                moniteurTheorique: null,
                loaded: false,
            },
            moniteurPratique: {
                moniteurPratique:null,
                loaded:false,
            },
         }
        
    };
}),

)

export function moniteurReducer(state, action){
    return _moniteurReducer(state, action);
}