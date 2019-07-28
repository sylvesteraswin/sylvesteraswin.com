import * as React from "react";
import { handleAuthentication } from "../util/auth";

export default () => {
  handleAuthentication();
  return <>"Loading..."</>;
};
