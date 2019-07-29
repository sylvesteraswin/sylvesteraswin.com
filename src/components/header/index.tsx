import cx from "classnames";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import React from "react";

import theme from "../../theme";

import {
  A,
  Container,
  Header as HeaderBase,
  Nav,
  NavItem as NavItemBase,
  Row,
  Col,
} from "@bootstrap-styled/v4";
import styled from "styled-components";

import NavALink from "../NavALink";

const Header = styled(HeaderBase)`
  top: 0;
  left: 0;
  z-index: 20;
  width: 100vw;
  transition: 0.4s ease;
  position: fixed;
`;

const HeaderWrapper = styled.div`
    box-shadow: 0px 4px 18px 0 rgba(32, 45, 73, 0.1);
    background-color: #fff;
    padding: ${theme.unit * 3}px 0;
    transition: .4s ease; }
    header .header-wrapper .logo {
    display: inline-block;
`;

const NavItem = styled(NavItemBase)``;

const HomeLink = styled(A)`
  filter: ${props => (props.blurred === "true" ? "blur(8px)" : "none")};
`;

interface HeaderProps {
  siteTitle: string;
}

const HeaderElement: React.FunctionComponent<HeaderProps> = ({ siteTitle }) => {
  const { logoImage } = useStaticQuery(graphql`
    query {
      logoImage: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(quality: 100, width: 120) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  return (
    <Header className={cx("position-fixed")}>
      <HeaderWrapper>
        <Container>
          <div className="header-menu">
            <Row className={cx("align-items-center", "justify-content-center")}>
              <Col xs="4" md="2">
                <HomeLink href="/" blurred={"true"}>
                  <Img
                    loading="lazy"
                    fixed={logoImage.childImageSharp.fixed}
                    fadeIn={false}
                  />
                </HomeLink>
              </Col>
              <Col xs="8" md="8">
                <Nav
                  navbar
                  className={cx("align-items-center", "justify-content-center")}
                >
                  <NavItem>
                    <NavALink href="/">Home</NavALink>
                  </NavItem>
                </Nav>
              </Col>
              <Col xs="0" md="2"></Col>
            </Row>
          </div>
        </Container>
      </HeaderWrapper>
    </Header>
  );
};

export default HeaderElement;
