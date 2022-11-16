export interface ProduitState {
    produit:{
        produit: any,
        loaded: boolean
    }
}

export const initialState: ProduitState = {
    produit:{
        produit: null,
        loaded: false
    }
}