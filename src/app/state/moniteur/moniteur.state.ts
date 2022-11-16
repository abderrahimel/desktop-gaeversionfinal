export interface MoniteurState {
    moniteur:{
        moniteurTheorique:{
            moniteurTheorique:any,
            loaded:boolean,
        },
        moniteurPratique:{
            moniteurPratique:any,
            loaded:boolean,
        }
    }
    
}

export const initialState:MoniteurState={
  moniteur:{
    moniteurTheorique:{
        moniteurTheorique: null,
        loaded: false,
    },
    moniteurPratique:{
        moniteurPratique: null,
        loaded: false,
    }
  }
}
