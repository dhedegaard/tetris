import styled from "@emotion/styled";
import { SVGProps } from "react";

const Grid = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 10 20" height="100%" fill="#000" {...props} />
);

export default styled(Grid)`
  background-color: #000;
  display: block;
  box-sizing: border-box;
`;
