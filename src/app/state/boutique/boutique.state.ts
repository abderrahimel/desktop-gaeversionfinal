export interface BoutiqueState {
        boutique:{
            boutique:any,
            loaded:boolean
        }
}
export const initialState:BoutiqueState = {
        boutique:{
            boutique:null,
            loaded: false
        } 
}