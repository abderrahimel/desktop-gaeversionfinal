export interface DepenseCategorieState {
    depenseCategorie:{
            categorieLocal: any,
            categorieVehicule: any,
            categoriePersonnel: any,
            loaded: boolean
    }
}

export const initialState: DepenseCategorieState = {
    depenseCategorie:{
        categorieLocal: null,
        categorieVehicule: null,
        categoriePersonnel: null,
        loaded: false
    }
}