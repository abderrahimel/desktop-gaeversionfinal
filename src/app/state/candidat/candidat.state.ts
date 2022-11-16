export interface CandidatState {
    candidat:{
        candidatBasic:any,
        candidatSupplementaire:any,
        loaded: boolean
    }
    
}
export const initialState: CandidatState = {
    candidat:{
        candidatBasic:null,
        candidatSupplementaire:null,
        loaded: false
    }
}

