export interface EmployeState {
    employe:{
        employe:any,
        loaded: boolean
    }
}

export const initialState: EmployeState ={
    employe:{
        employe: null,
        loaded: false
    }
}