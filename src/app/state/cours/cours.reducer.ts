import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { loadCourPratiqueToStore, loadCourTheoriqueToStore, removeCourPratiqueFromStore, removeCourTheoriqueFromStore } from "./cour.actions";
import { initialState } from "./cour.state";


const _courReducer = createReducer(initialState,
    on(loadCourTheoriqueToStore, (state, action)=>{
    return {...state,
        cours:{
            coursTheorique:{
                coursTheorique: action.payload,
                loaded: true
            },
            coursPratique:{
                coursPratique: state.cours.coursPratique.coursPratique,
                loaded: state.cours.coursPratique.loaded
            }
        }
    };
}), 
on(loadCourPratiqueToStore, (state, action)=>{
    return {...state,
        cours:{
            coursTheorique:{
                coursTheorique: state.cours.coursTheorique.coursTheorique,
                loaded: state.cours.coursTheorique.loaded
            },
            coursPratique:{
                coursPratique: action.payload,
                loaded: true
            }
        }
    };
}),
on(removeCourTheoriqueFromStore, (state)=>{
    return {...state,
        cours:{
            coursTheorique:{
                coursTheorique: null,
                loaded: false
            },
            coursPratique:{
                coursPratique: state.cours.coursPratique.coursPratique,
                loaded: state.cours.coursPratique.loaded
            }
        }
    };
}),
on(removeCourPratiqueFromStore, (state)=>{
    return {...state,
        cours:{
            coursTheorique:{
                coursTheorique: state.cours.coursTheorique.coursTheorique,
                loaded: state.cours.coursTheorique.loaded
            },
            coursPratique:{
                coursPratique: null,
                loaded: false
            }
        }
    };
}),

)

export function courReducer(state, action){
    return _courReducer(state, action);
}