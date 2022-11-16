export interface AbsenceState {
    absence:{
        absence:any,
        loaded: boolean
    }
}

export const initialState: AbsenceState ={
    absence:{
        absence:null,
        loaded: false
    }
}