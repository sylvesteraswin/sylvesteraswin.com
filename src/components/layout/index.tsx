import cx from "classnames";
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import BootstrapProvider from "@bootstrap-styled/provider";

import theme from "../../theme";

import Header from "../header";
import "./layout.css";

interface LayoutProps {
  children: React.ReactChild;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <BootstrapProvider
      theme={{
        "$font-size-h1": theme.typography.h1,
        "$font-size-h2": theme.typography.h2,
        "$font-size-h3": theme.typography.h3,
        "$font-size-h4": theme.typography.h4,
        "$font-size-h5": theme.typography.h5,
        "$font-size-h6": theme.typography.h6,
        "$font-size-base": theme.typography.body,
        "$btn-primary-color": theme.colors.white,
        "$btn-primary-bg": theme.colors.blue[60],
        "$btn-primary-border": theme.colors.blue[60],
        "$link-color": theme.colors.gray[100],
        "$link-hover-color": theme.colors.blue[60],
        "$link-hover-decoration": "none",
        "$btn-border-radius": "2px",
        "$btn-border-radius-lg": "2px",
        "$btn-border-radius-sm": "2px",
        "$enable-rounded": true,
      }}
    >
      <div id="main">
        <Header siteTitle={site.siteMetadata.title} />
        <main className={cx("posts", "blog-index")}>{children}</main>
        <footer>Footer</footer>
      </div>
    </BootstrapProvider>
  );
};

export default Layout;
