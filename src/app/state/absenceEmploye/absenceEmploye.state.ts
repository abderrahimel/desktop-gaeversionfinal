export interface AbsenceEmployeState {
    absenceEmploye:{
        absenceEmploye:any,
        loaded: boolean
    }
}

export const initialState: AbsenceEmployeState ={
    absenceEmploye:{
        absenceEmploye:null,
        loaded: false
    }
}