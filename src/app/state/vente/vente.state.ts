export interface VenteState {
    vente:{
        vente:any,
        loaded:boolean
    }
}


export const initialState: VenteState = {
    vente:{
        vente: null,
        loaded: false
    }
}
