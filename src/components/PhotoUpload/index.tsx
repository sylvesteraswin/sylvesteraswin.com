import cx from "classnames";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { Container, Col, H6, P, Row } from "@bootstrap-styled/v4";

import PreviewImage from "../../components/PreviewImage";
import Loader from "../../components/Loader";
import theme from "../../theme";
import getImageDimensions from "../../util/get-image-dimensions";

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

export interface PhotoUploadProps {
  authenticated: boolean;
}

const PhotoUpload: React.FunctionComponent<PhotoUploadProps> = ({
  authenticated = false,
}) => {
  if (!authenticated) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }
  const [files, setFiles] = React.useState([]);
  React.useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: async acceptedFiles => {
      const newFiles = [];
      for (const file of acceptedFiles) {
        const photoId = sha(file.name);
        const preview = URL.createObjectURL(file);
        const dim = await getImageDimensions(preview);
        newFiles.push({
          file,
          ...dim,
          photoId,
          preview,
        });
      }
      setFiles(newFiles);
    },
  });
  return (
    <React.Suspense
      fallback={
        <Container>
          <Loader />
        </Container>
      }
    >
      <H6 className={cx("mb-4")}>Upload</H6>
      <FileContainer {...getRootProps({ className: "cloudinary-dropzone" })}>
        <input {...getInputProps()} />
        <P
          style={{
            marginBottom: 0,
          }}
        >
          Drag 'n' drop some files here, or click to select files
        </P>
      </FileContainer>
      <div className={cx("mb-4")}>
        {files.length > 0 && (
          <>
            <H6>Upload status</H6>
            <Row>
              {files.map(
                ({ preview, photoId, width, height, file, ...rest }) => (
                  <Col xs={6} sm={3} key={photoId}>
                    <PreviewImage
                      file={file}
                      photoId={photoId}
                      width={width}
                      height={height}
                      preview={preview}
                    />
                  </Col>
                )
              )}
            </Row>
          </>
        )}
      </div>
    </React.Suspense>
  );
};

export default PhotoUpload;
