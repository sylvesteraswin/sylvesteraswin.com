import * as React from "react";
import request from "superagent";
import styled from "styled-components";
import { Progress as ProgressBase, ProgressBar } from "@bootstrap-styled/v4";

import theme from "../../theme";

const AspectRatioBox: any = styled.div`
  height: 0;
  overflow: hidden;
  border: 1px solid ${theme.colors.gray[10]};
  padding-top: ${({ imageWidth, imageHeight }: any) => {
    return imageHeight && imageWidth
      ? `calc(${imageHeight}/${imageWidth} * 100%)`
      : "100%";
  }};
  background: white;
  position: relative;
`;

const AspectRatioBoxInside = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const DisplayImage: any = styled.img`
  width: 100%;
  opacity: ${({ percent }: any) => (percent < 100 ? ".5" : "1")};
`;

const Progress = styled(ProgressBase)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${theme.unit / 2}px;
`;

const API_URL = `${process.env.CLOUDINARY_API}${process.env.CLOUDINARY_API_UPLOAD}`
  .replace("{cloudName}", process.env.CLOUDINARY_CLOUD_NAME)
  .replace("{type}", "image");

const SHOULD_UPLOAD = true;

export interface PreviewImageProps {
  file: File;
  preview: string;
  photoId: string;
  width: number;
  height: number;
}

const PreviewImage: React.FunctionComponent<PreviewImageProps> = ({
  file,
  photoId,
  preview,
  width,
  height,
}) => {
  const [percent, setPercent] = React.useState<number>(0);
  const [cdnUrl, setCdnUrl] = React.useState<string>(undefined);
  React.useEffect(() => {
    if (SHOULD_UPLOAD) {
      request
        .post(API_URL)
        .field("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET)
        .field("file", file)
        .field("multiple", true)
        .on("progress", progress => {
          if (progress.direction === "upload") {
            setPercent(progress.percent);
          }
        })
        .end((err, { body }) => {
          const { url } = body;
          const cdnImage = new Image();
          cdnImage.onload = function() {
            setCdnUrl(url);
          };
          cdnImage.src = url;
        });
    }
  }, []);
  return (
    <AspectRatioBox imageWidth={width} imageHeight={height}>
      <AspectRatioBoxInside>
        {percent !== 100 && (
          <Progress>
            <ProgressBar valueNow={percent} valueMax={100} />
          </Progress>
        )}
        <DisplayImage
          percent={percent}
          src={cdnUrl === undefined ? preview : cdnUrl}
        />
      </AspectRatioBoxInside>
    </AspectRatioBox>
  );
};

export default PreviewImage;
