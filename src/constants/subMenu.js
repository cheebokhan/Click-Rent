import { GenerateDueIcon, PreviousDueIcon } from "../components/icons";
import { CLEAR_SUB_MENU, SET_SUB_MENU } from "./types";

export const setSubmenu = (name, params) => async (dispatch) => {
    try {
        dispatch({ type: SET_SUB_MENU, payload: getDuesSubmenu(params) })
    } catch (e) {
    }

}


export const clearSubmenu = () => async dispatch => {
    dispatch({ type: CLEAR_SUB_MENU })
}

export const getDuesSubmenu = (params) => {
    return [
        { key: "generated", component: GenerateDueIcon, link: `/dues/duesGenerated/${params}` },
        { key: "previous", component: PreviousDueIcon, link: `/dues/previousDues/${params}` }
    ];
}

