export interface MoniteurPratiqueState {
        moniteurPratique:{
            moniteurPratique:any,
            loaded:boolean,
        }
    
}

export const initialState:MoniteurPratiqueState={
    moniteurPratique:{
        moniteurPratique: null,
        loaded: false,
    }
}
