export interface UserState {
    user:{
        user:any,
        loaded:boolean
    },
    token:any,
    
}
export const initialState: UserState = {
    user:{
        user:null,
        loaded:false
    },
    token:null,
}