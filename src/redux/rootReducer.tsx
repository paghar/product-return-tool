import {combineReducers} from "redux";
import userReducer from "./returnForm/returnFormReducer";

const rootReducer = combineReducers({   
    form: userReducer,    
});

export default rootReducer;
