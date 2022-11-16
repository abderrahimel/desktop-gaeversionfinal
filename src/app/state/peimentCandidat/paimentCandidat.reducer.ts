import { createReducer, on } from "@ngrx/store";
import { deletePaiment, loadedPaiment, updateIdCandidat } from "./paimentCandidat.actions";
import { initialState } from "./peimentCandidat.state";


const _candidatPaimentReducer = createReducer(initialState,
    on(loadedPaiment, (state, action)=>{
    return {...state,
        paimentCandidat:{
            paiment: action.payload,
            idCandidat: state.paimentCandidat.idCandidat,
            loaded: true
        }
    };
}), 
on(deletePaiment, (state)=>{
    return {...state,
        paimentCandidat:{
            paiment: null,
            idCandidat: null,
            loaded: false
        }
    };
}),
on(updateIdCandidat, (state, action)=>{
  return  {...state,
        paimentCandidat:{
            paiment: state.paimentCandidat.paiment,
            idCandidat: action.id,
            loaded: state.paimentCandidat.loaded
        }
    };
})

)

export function candidatPaimentReducer(state, action){
    return _candidatPaimentReducer(state, action);
}
