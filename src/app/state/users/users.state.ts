export interface UsersState {
    users: {
        users: any,
        loaded: boolean
    }
}

export const initialState: UsersState = {
    users: {
        users: null,
        loaded: false
    }
}
