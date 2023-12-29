import { createGlobalState } from "react-hooks-global-state";
const { setGlobalState, useGlobalState } = createGlobalState ({
id: 0,
 isLoggedIn: false, 
 currentUser: {}, 
    loginError: undefined, 
    loading: true,
    refreshPost: true,
     refreshComment: true,
      hide: false, refreshDash:
true,
page: 1,
});
export { setGlobalState, useGlobalState }