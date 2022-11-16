import { createAction, props } from "@ngrx/store";

export const loadAutoEcolesApprover = createAction('[AutoEcolesApprover] load Auto Ecoles Approver'); 
export const loadAutoEcolesApprovertostore = createAction('[AutoEcolesApprover] load Auto Ecoles Approver to store',props<{payload:any}>());