import * as React from "react";
import styled, { keyframes } from "styled-components";
import theme from "../../theme";

import { P } from "@bootstrap-styled/v4";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const spinner = keyframes`{
    10% { content: "⠙"; }
    20% { content: "⠹"; }
    30% { content: "⠸"; }
    40% { content: "⠼"; }
    50% { content: "⠴"; }
    60% { content: "⠦"; }
    70% { content: "⠧"; }
    80% { content: "⠇"; }
    90% { content: "⠏"; }
  }`;

const Spinner = styled.div`
  color: ${theme.colors.gray[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  &:after {
    animation: ${spinner} 0.8s linear infinite;
    display: block;
    content: "⠋";
    font-size: 1.125rem;
  }
`;

const Text = styled(P)`
  margin-bottom: 0;
  margin-left: ${theme.unit}px;
`;

const Loader: React.FunctionComponent<any> = () => (
  <Wrapper>
    <Spinner />
    <Text>Loading...</Text>
  </Wrapper>
);

export default Loader;
