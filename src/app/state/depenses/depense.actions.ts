import { createAction, props } from "@ngrx/store";

// actions for depense local
export const loadDepenselocal = createAction('[depense local] load depense local', props<{idAutoEcole:any}>());
export const addDepenseLocal = createAction('[depense local] add depense local', props<{idAutoEcole:any, data:any}>());
export const updateDepenselocal = createAction('[depense local] update depense local', props<{id:any, data:any}>());
export const loadDepenselocalToStore = createAction('[depense local] load depense local to the state depense of the store', props<{local:any}>());
export const deleteDepenselocal = createAction('[depense local] delete depense local by id', props<{id:any}>());

// actions for depense vehicule
export const loadDepensevehicule = createAction('[depense vehicule] load depense vehicule', props<{idAutoEcole:any}>());
export const addDepensevehicule = createAction('[depense vehicule] add depense vehicule', props<{idAutoEcole:any, data:any}>());
export const updateDepensevehicule = createAction('[depense vehicule] update depense vehicule', props<{id:any, data:any}>());
export const loadDepensevehiculeToStore = createAction('[depense vehicule] load depense vehicule to the state depense of the store', props<{vehicule:any}>());
export const deleteDepensevehicule = createAction('[depense vehicule] delete depense vehicule by id', props<{id:any}>());

// actions for deopense personnel

export const loadDepensepersonnel = createAction('[depense personnel] load depense personnel', props<{idAutoEcole:any}>());
export const addDepensepersonnel = createAction('[depense personnel] add depense personnel', props<{idAutoEcole:any, data:any}>());
export const updateDepensepersonnel = createAction('[depense personnel] update depense personnel', props<{id:any, data:any}>());
export const loadDepensepersonnelToStore = createAction('[depense personnel] load depense personnel to the state depense of the store', props<{personnel:any}>());
export const deleteDepensepersonnel = createAction('[depense personnel] delete depense personnel by id', props<{id:any}>());
