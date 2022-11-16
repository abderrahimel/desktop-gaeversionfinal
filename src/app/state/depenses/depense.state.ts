export interface DepenseState{
    depense:{
        local:{
            local: any,
            loaded: boolean
        },
        vehicule:{
            vehicule: any,
            loaded: boolean
        },
        personnel:{
            personnel: any,
            loaded: boolean
        }
    }
};

export const initialState: DepenseState ={
    depense:{
        local:{
            local: null,
            loaded: false
        },
        vehicule:{
            vehicule: null,
            loaded: false
        },
        personnel:{
            personnel: null,
            loaded: false
        }
    }
}
