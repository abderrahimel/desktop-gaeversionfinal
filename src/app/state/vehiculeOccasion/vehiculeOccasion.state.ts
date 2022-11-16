export interface VehiculeOccasionState {
    vehiculeOccasion:{
        vehiculeOccasion:any,
        loaded:boolean
    }
}

export const initialState:VehiculeOccasionState = {
    vehiculeOccasion:{
        vehiculeOccasion:null,
        loaded: false
    } 
}