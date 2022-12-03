import { createReducer, on } from "@ngrx/store";
import { loadvisiteTechniqueToStore } from "./visiteTechnique.actions";
import { initialState } from "./visiteTechnique.state";

const _visiteTechniqueReducer = createReducer(initialState,
    on(loadvisiteTechniqueToStore, (state, action)=>{
    return {...state,
        visiteTechnique: {
            visiteTechnique:action.payload,
            loaded: true
        }
    };
}),
)

export function visiteTechniqueReducer(state, action){
    return _visiteTechniqueReducer(state, action);
}