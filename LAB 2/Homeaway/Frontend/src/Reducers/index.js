import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import LoginReducer from "./reducer_login";
import AddPropertyReducer from "./reducer_addProperty";
import OwnerPropertyReducer from "./reducer_ownerProperties";
import PropertyDisplay from "./reducer_propertyDisplay";
import SearchPropertyReducer from "./reducer_searchProperties";
import SignUpReducer from "./reducer_signUp";
import BookingReducer from "./reducer_booking";

import TokenReducer from "./reducer_token";

const rootReducer = combineReducers({
  LoginReducer,
  AddPropertyReducer,
  TokenReducer,
  PropertyDisplay,
  OwnerPropertyReducer,
  SearchPropertyReducer,
  SignUpReducer,
  BookingReducer,
  form: formReducer
});
export default rootReducer;
