import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";

export interface DataProps {
  homeBg: {
    original: {
      src: string;
    };
    sizes: {
      src: string;
    };
  };
}

const HomeSplashTitle: React.FunctionComponent<any> = () => {
  return <></>;
};

export default HomeSplashTitle;
