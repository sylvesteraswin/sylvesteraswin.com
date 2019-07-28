import cx from "classnames";
import { CloudinaryContext } from "cloudinary-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import theme from "../theme";
import request from "superagent";
import { Container } from "@bootstrap-styled/v4";

import SEO from "../components/seo";

import { Col, H4, P, Row } from "@bootstrap-styled/v4";

import Loader from "../components/Loader";
import useSessionCheck from "../hooks/use-session-check";

const sha = require("js-sha1");

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.gray[10]};
  color: ${theme.colors.gray[30]};
  flex: 1 1 0%;
  padding: ${theme.unit * 4}px;
  border-width: ${theme.unit / 2};
  border-radius: ${theme.unit / 2};
  border-color: ${theme.colors.gray[30]};
  border-style: dashed;
  outline: none;
  transition: border 0.24s ease-in-out 0s;
`;

const IndexPage = () => {
  const [files, setFiles] = React.useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            photoId: sha(file.name),
          })
        )
      );
    },
  });
  const { authticated } = useSessionCheck();
  React.useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  if (!authticated) {
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
      <CloudinaryContext
        cloudName={process.env.CLOUDINARY_CLOUD_NAME}
        uploadPreset={process.env.CLOUDINARY_UPLOAD_PRESET}
      >
        <SEO title="Admin" />
        <Container>
          <H4 className="mb-4">Admin</H4>
          <FileContainer
            {...getRootProps({ className: "cloudinary-dropzone" })}
          >
            <input {...getInputProps()} />
            <P
              style={{
                marginBottom: 0,
              }}
            >
              Drag 'n' drop some files here, or click to select files
            </P>
          </FileContainer>
          <div className={cx("mt-2")}>
            {files.length > 0 && (
              <Row>
                {files.map(({ preview, photoId }) => (
                  <Col xs={6} sm={3} key={photoId}>
                    <img src={preview} />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </Container>
      </CloudinaryContext>
    </React.Suspense>
  );
};

export default IndexPage;
