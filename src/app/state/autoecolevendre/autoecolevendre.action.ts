import { createAction, props } from "@ngrx/store";

export const loadautoecolevendreaction = createAction('[autoecolevendre] load auto ecole vendre'); 
export const loadautoecolevendretostore = createAction('[autoecolevendre]  auto ecole vendre to store',props<{payload:any}>());
