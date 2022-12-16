import { createReducer, on } from "@ngrx/store";
import { loadedPresencecourPratiqueToStore, loadedPresencecourTheoriqueToStore } from "./presencecours.actions";
import { initialState } from "./presencecours.state";


const _presencecourReducer = createReducer(initialState,
    on(loadedPresencecourTheoriqueToStore, (state, action)=>{
    return {...state,
        presencecourstheorique:{
            presencecourstheorique: action.payload,
            loaded: true
        },
        presencecourspratique:{
            presencecourspratique: state.presencecourstheorique.presencecourstheorique,
            loaded: state.presencecourstheorique.loaded
        }
    };
}),
// 
on(loadedPresencecourPratiqueToStore, (state, action)=>{
    return {...state,
        presencecourstheorique:{
            presencecourstheorique: state.presencecourstheorique.presencecourstheorique,
            loaded: state.presencecourstheorique.loaded
        },
        presencecourspratique:{
            presencecourspratique: action.payload,
            loaded: true
        }
    };
}),

)

export function presencecourReducer(state, action){
    return _presencecourReducer(state, action);
}