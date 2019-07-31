import auth0 from "auth0-js";
import { navigate } from "gatsby";
import { userStore } from "./store";

export const isBrowser = typeof window !== "undefined";

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      redirectUri: process.env.AUTH0_CALLBACK,
      responseType: "token id_token",
      scope: "openid profile email"
    })
  : {};

const user = {};

export enum ErrorTypeEnum {
  NOT_FOUND = "NOT_FOUND",
  EXPIRED = "EXPIRED"
}

export function shouldTriggerAuthFlow(err: Error) {
  return (
    err.name &&
    (err.name === ErrorTypeEnum.NOT_FOUND || err.name === ErrorTypeEnum.EXPIRED)
  );
}

function createAccessTokenError(type: ErrorTypeEnum, message: string) {
  const err = new Error();
  err.name = type;
  err.message = message;
  return err;
}

export const getAccessToken = () => {
  return userStore
    .getItem<never>("access_token")
    .then(isExits)
    .then(isNotExpired);
};

export const isExits = (accessToken: Promise<never>) => {
  if (!accessToken) {
    return Promise.reject(
      createAccessTokenError(ErrorTypeEnum.NOT_FOUND, "Access token is null")
    );
  }
  return accessToken;
};

function isNotExpired(accessToken: Promise<never>) {
  return userStore.getItem<never>("expires_at").then(expiresAt => {
    const expiration = +new Date(expiresAt);

    if (expiration - +new Date() < 0) {
      return Promise.reject(
        createAccessTokenError(ErrorTypeEnum.EXPIRED, "Access Token expired")
      );
    }

    return accessToken;
  });
}

export function navigateAuthFlow() {
  if (isBrowser) {
    userStore.setItem(
      "return_to",
      new URL(window.location as any).pathname + window.location.hash
    );
    auth.authorize();
  }
}

export const handleAuthentication = () => {
  if (isBrowser) {
    const hash = window.location.hash.slice(1);

    // use a dummy host to parse searchParams
    const url = new URL("http://localhost/?" + hash);

    const promises = [];

    for (const [param, value] of url.searchParams as any) {
      promises.push(userStore.setItem(param, value));

      if (param === "expires_in") {
        const d = new Date();
        d.setSeconds(d.getSeconds() + parseInt(value, 10));
        promises.push(userStore.setItem("expires_at", d));
      }
    }

    Promise.all(promises)
      .then(() => userStore.getItem<string>("return_to"))
      .then(returnTo => navigate(returnTo ? returnTo : "/"));
  }
};

export const getProfile = () => {
  return user;
};

export const logout = async () => {
  await userStore.setItem("isLoggedIn", "false");
  (auth as any).logout();
};
