export interface DataSuperAdminState {
    dataSuperAdmin:{
        dataSuperAdmin:any,
        loaded: boolean
    }  

}

export const initialState: DataSuperAdminState = {
    dataSuperAdmin:{
            dataSuperAdmin: null,
            loaded: false
    }
}