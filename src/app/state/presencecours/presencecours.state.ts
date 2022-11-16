export interface presencecourState {
    presencecourstheorique:{ 
        presencecourstheorique:any,
        loaded: boolean
    },
    presencecourspratique:{
        presencecourspratique: any,
        loaded: boolean
    }
}

export const initialState: presencecourState = {
    presencecourstheorique:{
        presencecourstheorique: null,
        loaded: false
    },
    presencecourspratique:{
        presencecourspratique: null,
        loaded: false
    }
}