import { CHANGE_SIDEBAR_STATUS } from "../reducer/sidebarReducer";

export const changeSidebarStatus = () => (dispatch) => {
    dispatch(CHANGE_SIDEBAR_STATUS())
}