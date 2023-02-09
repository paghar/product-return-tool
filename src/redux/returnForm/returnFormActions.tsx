import { INSERT_FORMD_DATA, GET_FORMD_DATA } from "./returnFormTypes";
import { IReturnModel } from "../../data/interface";

//******************* Actions *******************
export const insertFormData = (data: IReturnModel) => {
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
