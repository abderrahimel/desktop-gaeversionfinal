export interface ProduitCandidatState {
    produitCandidat: {
        produitCandidat: any,
        loaded: boolean
    }
}

export const initialState: ProduitCandidatState = {
    produitCandidat: {
        produitCandidat: null,
        loaded:false
    }
}
