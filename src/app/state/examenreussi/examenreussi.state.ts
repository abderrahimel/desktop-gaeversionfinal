export interface ExamenreussiState {
    examenreussi:{
        loaded:boolean,
        examenreussi:any
    }
}

export const initialState : ExamenreussiState = {
    examenreussi:{
        loaded: false,
        examenreussi: null
    }
}