import {INSERT_FORMD_DATA, GET_FORMD_DATA} from "./returnFormTypes";
import {FieldValues} from "react-hook-form/dist/types/fields";

//******************* Actions *******************
export const insertFormData = (data: FieldValues) => {
    return {
        type: INSERT_FORMD_DATA,
        payload: data,
    };
};

export const getFormData = () => {
    return {
        type: GET_FORMD_DATA,
    };
};
