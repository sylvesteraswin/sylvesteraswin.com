import * as React from "react";

export interface PageProps {
  mainContainer?: {
    paddingTop?: string;
    paddingBottom?: string;
  };
}

const PageContext = React.createContext<PageProps>({});

export default PageContext;
