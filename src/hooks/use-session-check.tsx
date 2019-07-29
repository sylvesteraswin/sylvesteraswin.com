import * as React from "react";
import {
  navigateAuthFlow,
  getAccessToken,
  shouldTriggerAuthFlow,
} from "../util/auth";

const useSessionCheck = (): { authenticated: boolean } => {
  const [authenticated, setAuthenticated] = React.useState<boolean>(false);
  React.useEffect(() => {
    getAccessToken().then(
      () => {
        // success
        setAuthenticated(true);
      },
      err => {
        // not logged in state
        setAuthenticated(false);
        if (shouldTriggerAuthFlow(err)) {
          navigateAuthFlow();
        }
      }
    );
    return () => {};
  }, []);
  return { authenticated };
};

export default useSessionCheck;
