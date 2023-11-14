import { Reducer } from "redux";
import { SystemFieldsActionCreater } from "./actions";
import { inItFormBuilderState } from "../../FormBuilder1/ContactDesignState";

const reducer: Reducer= (state = inItFormBuilderState,action) => {
  switch (action.type) {
  
    case SystemFieldsActionCreater.ADD_SYSTEM_FIELDS: {
        if(!state.SystemFields){
      let systemFields:any = [...state.SystemFields]
      systemFields=action.payload
      return {...state, showLoader:false ,SystemFields:[...systemFields]};

     }
   }
    default: {
      return  state 
    }
  }
};
export {reducer as SystemFieldReducer}
