export interface AssuranceState {
    assurance:{
        assurance:any,
        loaded:boolean
    }
}


export const initialState: AssuranceState = {
    assurance:{
        assurance: null,
        loaded: false
    }
}
