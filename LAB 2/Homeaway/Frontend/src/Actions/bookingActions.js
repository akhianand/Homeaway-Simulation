import axios from "axios";
const ROOT_URL = "http://localhost:8000";
export const BOOKING_SUCCESS = "booking_added_successfully";
export const BOOKING_FAILURE = "booking_add_error";


export function createNewBooking(data) {
  console.log(data)
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =
    "JWT " + localStorage.getItem("user");
      var response = await axios.post(`${ROOT_URL}/user/createNewBooking`, data);
      if (response.status === 200) {
      dispatch({
        type: BOOKING_SUCCESS,
        payload: "Booking Added SuccessFully"
      });
    }
    } catch (error) {
      dispatch({
        type: BOOKING_FAILURE,
        payload: error
      });
    }
  };
}


