import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";


const getUserState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(getUserState, (state)=>{ 
    return state.user.user;
});
export const getLoadUser = createSelector(getUserState, (state)=>{
    return state.user.loaded;
});
export const getLogin = createSelector(getUserState, (state)=>{
    return state.user.user.login;
})