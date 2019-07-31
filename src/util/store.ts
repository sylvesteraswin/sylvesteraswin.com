import localforage from "localforage";
import { isBrowser } from "../util/auth";

declare global {
  interface Window {
    localforage: any;
  }
}

const userStoreConfig = {
  driver: localforage.INDEXEDDB,
  name: "memories-user"
};

const userStore = localforage.createInstance({
  ...userStoreConfig
});

export default localforage;
export { userStore };
