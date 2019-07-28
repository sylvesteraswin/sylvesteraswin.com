import * as React from "react";
import {
  navigateAuthFlow,
  getAccessToken,
  shouldTriggerAuthFlow,
} from "../util/auth";

const useSessionCheck = () => {
  React.useEffect(() => {
    getAccessToken().then(
      () => {
        // success
        console.log("logged in");
      },
      err => {
        // not logged in state
        console.log("not logged in");
        if (shouldTriggerAuthFlow(err)) {
          navigateAuthFlow();
        }
      }
    );
    return () => {};
  }, []);
};

export default useSessionCheck;
