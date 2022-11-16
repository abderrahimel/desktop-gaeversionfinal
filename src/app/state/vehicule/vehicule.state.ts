export interface VehiculeState {
    vehicule: {
        vehicule: any,
        loaded: boolean
    }
}

export const initialState: VehiculeState = {
    vehicule: {
        vehicule: null,
        loaded:false
    }
}
