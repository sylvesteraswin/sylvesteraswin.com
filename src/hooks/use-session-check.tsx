import * as React from "react";
import {
  navigateAuthFlow,
  getAccessToken,
  shouldTriggerAuthFlow,
} from "../util/auth";

const useSessionCheck = (): { authticated: boolean } => {
  const [authticated, setAuthticated] = React.useState<boolean>(false);
  React.useEffect(() => {
    getAccessToken().then(
      () => {
        // success
        setAuthticated(true);
      },
      err => {
        // not logged in state
        setAuthticated(false);
        if (shouldTriggerAuthFlow(err)) {
          navigateAuthFlow();
        }
      }
    );
    return () => {};
  }, []);
  return { authticated };
};

export default useSessionCheck;
