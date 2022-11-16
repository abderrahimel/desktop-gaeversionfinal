import { createAction, props } from "@ngrx/store";

// actions for categorie depense
export const loadCategoriedepense = createAction('[categorie depense] load categorie depense', props<{idAutoEcole:any}>());
export const loadcategoriedepenseToStore = createAction('[categorie depense] load categorie depense to the state categorie of the store', props<{local:any, personnel:any, vehicule:any}>());
export const deletDepenseCategorieById = createAction('[categorieDepense] delet categorie depense by Id', props<{id:any}>());
export const addDepenseCategorie = createAction('[categorieDepense] add categorie depense ', props<{idAutoEcole:any, data:any}>());
export const updateDepenseCategorie = createAction('[categorieDepense] update categorie depense by id', props<{id:any, data:any}>());
