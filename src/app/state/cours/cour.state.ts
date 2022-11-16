export interface CourState {
    cours:{
        coursTheorique:{
            coursTheorique:any,
            loaded:boolean
        },
        coursPratique:{
            coursPratique:any,
            loaded:boolean
        }
    }
}

export const initialState : CourState ={
    cours:{
        coursTheorique:{
            coursTheorique:null,
            loaded: false
        },
        coursPratique:{
            coursPratique: null,
            loaded: false
        }
    }
}
