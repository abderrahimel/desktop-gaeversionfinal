export interface ExamenState {
    examen:{
        loaded:boolean,
        examen:any
    }
}

export const initialState : ExamenState = {
    examen:{
        loaded:false,
        examen:null
    }
}

