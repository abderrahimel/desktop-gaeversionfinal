import { createReducer, on } from "@ngrx/store";
import { loadMoniteurPratiqueTostore } from "./moniteurPratique.actions";
import { initialState } from "./moniteurPratique.state";

const _moniteurPratiqueReducer = createReducer(initialState,
    on(loadMoniteurPratiqueTostore, (state, action)=>{
    return {...state,
                moniteurPratique: {
                    moniteurPratique: action.payload,
                    loaded: true,
                },
    };
}), 


)

export function moniteurPratiqueReducer(state, action){
    return _moniteurPratiqueReducer(state, action);
}


