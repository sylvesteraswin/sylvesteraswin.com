import { Col, Container, H6, P, Row } from "@bootstrap-styled/v4";
import cx from "classnames";
import { Cloudinary as CoreCloudinary, Util } from "cloudinary-core";
import * as React from "react";
import styled from "styled-components";

import Loader from "../../components/Loader";
import theme from "../../theme";

export interface PhotoUpListProps {
  authenticated: boolean;
}

const PhotoUpList: React.FunctionComponent<PhotoUpListProps> = ({
  authenticated = false
}) => {
  if (!authenticated) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }
  React.useEffect(() => {
    if (authenticated) {
      /* const options = {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        format: "json",
        version: Math.ceil(new Date().getTime() / 1000),
      };
      const scOptions = Util.withSnakeCaseKeys(options);
      const cl = new CoreCloudinary({
        ...scOptions,
      });
      console.log(cl);
      const url = cl.url("ttpdjupivy1t5ch7liqa");
      console.log(url); */

      fetch(
        "https://252888793528247:Ag0E3dsZ9VcoZd4d_DqcQiIIyvk@api.cloudinary.com/v1_1/memoriesbysylvester/resources/image/upload"
      )
        .then(res => res.text())
        .then(res => {
          console.log(res);
        });
    }
    return () => {};
  }, [authenticated]);
  return (
    <React.Suspense
      fallback={
        <Container>
          <Loader />
        </Container>
      }
    >
      <H6 className={cx("mb-4")}>List</H6>
    </React.Suspense>
  );
};

export default PhotoUpList;
