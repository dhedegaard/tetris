import styled from "@emotion/styled";
import { FC, SVGProps } from "react";

const Grid = styled((props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 400" height="100%" {...props} />
))`
  background-color: #000;
  display: block;
  aspect-ratio: 1 / 2;
  box-sizing: border-box;
`;

export default Grid;
