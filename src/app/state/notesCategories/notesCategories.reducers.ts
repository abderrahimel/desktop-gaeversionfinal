import { createReducer, on } from "@ngrx/store";
import { loadnoteCategorieToStore } from "./notesCategories.actions";
import { initialState } from "./notesCategories.state";

const _noteCategorieReducer = createReducer(initialState,
    on(loadnoteCategorieToStore, (state, action)=>{
    return {...state,
        noteCategorie:{
            noteCategorie: action.payload,
            loaded: true
        }
    };
}), 

)

export function noteCategorieReducer(state, action){
    return _noteCategorieReducer(state, action);
}