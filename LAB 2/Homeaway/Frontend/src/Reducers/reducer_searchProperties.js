import {
  SEARCH_PROPERTIES,
  SEARCH_PROPERTY_FETCH_ERROR,
  SEARCH_BLANK,
  SEARCH_PARAMS
} from "../Actions/propertyActions";
import moment from "moment";


export default function(
  state = {
    properties: [],
    error: false,
    errorMessage: "",
  },
  action
) {
  switch (action.type) {
    case SEARCH_PROPERTIES:
      return { ...state, properties: action.payload, error: false };
    case SEARCH_PROPERTY_FETCH_ERROR:
      return { ...state, properties: [],error: true, errorMessage: action.payload };
    case SEARCH_BLANK:
      return { ...state, properties: [], error: true, errorMessage: action.payload };
    case SEARCH_PARAMS:
      return {
        ...state,
        data:action.payload
      };
    default:
      return state ;
  }
}
