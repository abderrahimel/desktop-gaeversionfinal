export interface StateAbonnement {
    abonnement:{
        abonnement: any,
        loaded:boolean
    }

}
export const initialState: StateAbonnement = {
    abonnement:{
        abonnement: null,
        loaded: false
    }
}