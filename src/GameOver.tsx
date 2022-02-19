import { FC, SVGProps } from "react";
import styled from "@emotion/styled";

const Text = styled.text`
  text-transform: uppercase;
  font-size: 0.125vh;
  pointer-events: none;
  user-select: none;
`;

const RetryText = styled.text`
  text-transform: uppercase;
  font-size: 0.08vh;
  pointer-events: none;
  user-select: none;
`;

type Props = SVGProps<SVGRectElement>;

const GameOver: FC<Props> = (props) => (
  <G width={20} transform="translate(1, 7.5)" fill="#000" color="#fff">
    <rect
      {...props}
      fill="currentFill"
      stroke="currentColor"
      strokeWidth={0.2}
      x={0}
      width={8}
      y={0}
      height={5}
    />
    <Text x={0.75} y={1.5} fill="currentColor" width={20 - 0.75 * 2}>
      Game over
    </Text>
    <RetryText x={1.25} y={3} fill="currentColor" width={20 - 0.75 * 2}>
      Press &apos;r&apos; to
    </RetryText>
    <RetryText x={2} y={4} fill="currentColor" width={20 - 0.75 * 2}>
      try again
    </RetryText>
  </G>
);

const G = styled.g`
  cursor: pointer;
`;

export default GameOver;
