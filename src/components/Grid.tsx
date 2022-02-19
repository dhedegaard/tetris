import styled from "@emotion/styled";
import { SVGProps } from "react";

const Grid = styled((props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 10 20" height="100%" {...props} />
))`
  background-color: #000;
  display: block;
  box-sizing: border-box;
`;

export default Grid;
