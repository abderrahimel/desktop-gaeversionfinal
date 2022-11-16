export interface NoteCategorieState {
    noteCategorie:{
        noteCategorie: any,
        loaded: boolean
    }
}

export const initialState: NoteCategorieState = {
    noteCategorie:{
        noteCategorie: null,
        loaded: false
    }
}