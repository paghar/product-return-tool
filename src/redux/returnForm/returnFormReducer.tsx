import {
    INSERT_FORMD_DATA,
    GET_FORMD_DATA 
} from "./returnFormTypes";

const initialState = {    
    formData:{},    
};

const reducer = (state = initialState, action:any) => {
    switch (action.type) { 

        case INSERT_FORMD_DATA: 
            return {
                ...state,
                formData: action.payload
            };     

        case GET_FORMD_DATA:                    
            return state;                
            
        default: return state;
    }
};

export default reducer;


