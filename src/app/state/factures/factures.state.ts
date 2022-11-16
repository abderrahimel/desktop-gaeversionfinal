export interface FactureState {
    factures:{
        factures: any,
        loaded: boolean
    }
}

export const initialState: FactureState = {
    factures:{
        factures: null,
        loaded: false
    }
}