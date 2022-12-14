import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../utils/help";


/** if i were to do the same function in async await mode
 *
 */

async function storeUserSession(uid, sessionState) {
  try {
    await AsyncStorage.setItem("user_uid", uid);
    await AsyncStorage.setItem("user_is_logged_in", sessionState);
  } catch (error) {
    showToast("error", error.message);
  }
}






async function getUserId() {
  try {

    const value = await AsyncStorage.getItem("user_uid");
      if(value !== null){
        return value
      }

  } catch (error) {
    showToast("error", error.message);
  }
}

async function getUserLoggedInStatus() {
  try {

    const value = await AsyncStorage.getItem("user_is_logged_in");
      if(value !== null){
        return value
      }

  } catch (error) {
    showToast("error", error.message);
  }
}

export {storeUserSession, getUserLoggedInStatus,getUserId}



// THEN CATCH REPLACEMEBT OF ABOVE FUNC

// uid will be a string of user id
// session state will be a string of "true", "false"
// function storeUserSession(uid, sessionState) {
//   AsyncStorage.setItem("user_uid", uid)
//     .then((uidResponse) => {
//       AsyncStorage.setItem("user_is_logged_in", sessionState)
//         .then((sessionResponse) => {})
//         .catch((sessionError) => {
//           showToast("error", sessionError.message);
//         });
//     })
//     .catch((uidError) => {
//       showToast("error", uidError.message);
//     });
// }
