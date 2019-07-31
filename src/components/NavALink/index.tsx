import { A } from "@bootstrap-styled/v4";
import styled from "styled-components";

import theme from "../../theme";

const NavALink = styled(A)`
  font-size: ${theme.typography.body};
  line-height: ${theme.unit & 3};
  transition: 0.3s ease;
  padding: ${theme.unit * 2}px ${theme.unit * 3}px;
  text-transform: capitalize;
  font-weight: 500;
  position: relative;
  display: block;
  line-height: ${theme.unit * 3}px;
  &.active,
  &:hover {
    &:before {
      width: calc(100% - ${theme.unit * 6}px);
    }
  }
  &:before {
    background-color: ${theme.colors.blue[60]};
    content: "";
    display: block;
    position: absolute;
    height: ${theme.unit / 2}px;
    width: 0px;
    bottom: ${theme.unit}px;
    transition: all 0.4s cubic-bezier(0.22, 0.68, 0, 1.71);
  }
`;

export default NavALink;
