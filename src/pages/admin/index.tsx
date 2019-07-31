import { Col, Container, H4, Nav, NavItem, Row } from "@bootstrap-styled/v4";
import * as cx from "classnames";
import * as React from "react";

import Loader from "../../components/Loader";
import NavALink from "../../components/NavALink";
import SEO from "../../components/seo";
import useSessionCheck from "../../hooks/use-session-check";

import PhotoList from "../../components/PhotoList";
import PhotoUpload from "../../components/PhotoUpload";

export enum AdminSectionEnum {
  "NEW" = "new",
  "LIST" = "list"
}

const AdminPage = () => {
  const [activeSection, setActiveSection] = React.useState<AdminSectionEnum>(
    AdminSectionEnum.LIST
  );
  const { authenticated } = useSessionCheck();
  if (!authenticated) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }
  return (
    <React.Suspense
      fallback={
        <Container>
          <Loader />
        </Container>
      }
    >
      <>
        <SEO title="Admin" />
        <Container>
          <H4 className="mb-4">Admin</H4>
          <Row>
            <Col xs={2}>
              <Nav style={{ flexDirection: "column" }}>
                {Object.keys(AdminSectionEnum).map((key, index) => (
                  <NavItem key={index}>
                    <NavALink
                      className={cx({
                        active: AdminSectionEnum[key] === activeSection
                      })}
                      style={{
                        paddingLeft: 0
                      }}
                      onClick={(e: MouseEvent) => {
                        e.preventDefault();
                        setActiveSection(AdminSectionEnum[key]);
                      }}
                      href="javascript:void(0);"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                    </NavALink>
                  </NavItem>
                ))}
              </Nav>
            </Col>
            <Col xs={10}>
              {activeSection === AdminSectionEnum.NEW && (
                <PhotoUpload authenticated={authenticated} />
              )}
              {activeSection === AdminSectionEnum.LIST && (
                <PhotoList authenticated={authenticated} />
              )}
            </Col>
          </Row>
        </Container>
      </>
    </React.Suspense>
  );
};

export default AdminPage;
