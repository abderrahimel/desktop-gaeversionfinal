export interface AbsenceMoniteurPratiqueState {
    absenceMoniteurPratique:{
        absenceMoniteurPratique:any,
        loaded: boolean
    }
}

export const initialState: AbsenceMoniteurPratiqueState = {
    absenceMoniteurPratique:{
        absenceMoniteurPratique: null,
        loaded: false
    }
}