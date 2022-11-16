export interface BlogState {
    blog:{
       blog:any,
       loaded:boolean
    }
    
}
export const initialState: BlogState = {
    blog:{
        blog: null,
        loaded: false
     }
}

