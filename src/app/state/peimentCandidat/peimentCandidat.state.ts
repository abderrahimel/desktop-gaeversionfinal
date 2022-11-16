export interface PaimentCandidatState {
    paimentCandidat:{
        paiment: any,
        idCandidat:any,
        loaded: boolean,

    }
}

export const initialState: PaimentCandidatState = {
    paimentCandidat:{
        paiment: null,
        idCandidat: null,
        loaded: false
    }
}
