export interface ExamenNoreussiState {
    examenNoreussi:{ 
        loaded:boolean,
        examenNoreussi:any
    }
}

export const initialState : ExamenNoreussiState = {
    examenNoreussi:{
        loaded: false,
        examenNoreussi: null
    }
}