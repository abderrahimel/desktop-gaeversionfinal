export interface CoursRecetteState {
    coursRecette:{
        loaded:boolean,
        permis:any,
        coursSupplementaire:any
    }
}

export const initialState : CoursRecetteState = {
    coursRecette:{
        loaded:false,
        permis: null,
        coursSupplementaire:null
    }
}
