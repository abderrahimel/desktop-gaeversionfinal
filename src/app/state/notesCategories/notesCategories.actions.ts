import { createAction, props } from "@ngrx/store";


export const loadnoteCategorie = createAction('[noteCategorie] load note categorie to store', props<{idAutoEcole:any}>());
export const loadnoteCategorieToStore = createAction('[noteCategorie] load note categorie to store', props<{payload:any}>());
export const deletnoteCategorie = createAction('[noteCategorie] delet note categorie by id', props<{id:any}>());
export const addNote = createAction('[noteCategorie] add note to the db', props<{idAutoEcole:any, data:any}>());
export const updateNote = createAction('[noteCategorie] update note to the db', props<{id:any, data:any}>());

