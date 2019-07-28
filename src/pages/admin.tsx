import React from "react";

import SEO from "../components/seo";

import { H1 } from "@bootstrap-styled/v4";

import useSessionCheck from "../hooks/use-session-check";

const IndexPage = () => {
  useSessionCheck();
  return (
    <>
      <SEO title="Admin" />
      <H1>Hello admin</H1>
    </>
  );
};

export default IndexPage;
