import { SavedRoute } from "./../interfaces/saved-route";

export const SavedRoutesReducer = (state: SavedRoute[] | null, action: SavedRoutesReducerAction) => {
    switch (action.type) {
        case "add": {
            if (!state) {
                state = [];
            }

            state.push(action.routeToAddOrReplace);

            return state;
        }
        case "replace": {
            state![action.indexToReplace!] = action.routeToAddOrReplace;

            return state;
        }
    }
};

interface SavedRoutesReducerAction {
    type: "add" | "replace";
    routeToAddOrReplace: SavedRoute;
    indexToReplace?: number;
}
