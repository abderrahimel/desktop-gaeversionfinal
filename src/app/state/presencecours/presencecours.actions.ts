import { createAction, props } from "@ngrx/store";

export const loadPresencecourTheorique = createAction('[presence cours theorique] load presence', props<{idAutoEcole: any}>());
export const loadedPresencecourTheoriqueToStore = createAction('[presence cours theorique] loaded presence theorique to store', props<{payload: any}>());
export const removePresenceById = createAction('[[presence cours theorique] remove presence theorique to store]', props<{id: any}>());