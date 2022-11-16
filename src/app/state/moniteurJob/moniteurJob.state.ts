export interface MoniteurJobState {
    moniteurJob:{
        moniteurJob:any,
        loaded:boolean
    }
}

export const initialState:MoniteurJobState = {
    moniteurJob:{
        moniteurJob:null,
        loaded: false
    } 
}