import { graphql } from "gatsby";
import React from "react";

import { GQData } from "../util/gq-types";

import { HomeSplashTitleProps } from "../components/HomeSplashTitle";
import SEO from "../components/seo";

import { H1 } from "@bootstrap-styled/v4";

export interface IndexPageProps
  extends GQData<Pick<HomeSplashTitleProps, "homeBg">> {}

const IndexPage: React.FunctionComponent<IndexPageProps> = ({ data }) => (
  <>
    <SEO title="Home" />
    <H1>Hello world</H1>
    {console.log(data)}
  </>
);

export default IndexPage;

export const query = graphql`
  query HomepageQuery {
    homeBg: imageSharp(original: { src: { regex: "/home-splash/" } }) {
      original {
        src
      }
      sizes(grayscale: true, quality: 50) {
        src
      }
    }
  }
`;
