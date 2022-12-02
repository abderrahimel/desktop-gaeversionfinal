import { createAction, props } from "@ngrx/store";


export const loadministerielleaction = createAction("[ministerielle] load ministerielle");
export const setload = createAction("[ministerielle] set load to false");
export const loadministerielleactionStore = createAction("[ministerielle] load ministerielle to store", props<{payload:any}>());
