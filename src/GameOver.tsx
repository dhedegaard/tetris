import { FC, memo, SVGProps } from "react";

type Props = SVGProps<SVGRectElement>;

const GameOver: FC<Props> = (props) => (
  <g
    width={20}
    transform="translate(1, 7.5)"
    fill="#000"
    color="#fff"
    className="cursor-pointer"
  >
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
    <text
      x={0.75}
      y={1.5}
      height={2}
      fill="currentColor"
      lengthAdjust="spacingAndGlyphs"
      textLength="65%"
      className="pointer-events-none select-none uppercase text-[0.125vh]"
    >
      Game over
    </text>
    <text
      x={0.5}
      y={3}
      fill="currentColor"
      lengthAdjust="spacingAndGlyphs"
      textLength="70%"
      className="uppercase text-[0.08vh] pointer-events-none select-none"
    >
      Press &apos;r&apos; to
    </text>
    <text
      x={1}
      y={4}
      fill="currentColor"
      lengthAdjust="spacingAndGlyphs"
      textLength="60%"
      className="uppercase text-[0.08vh] pointer-events-none select-none"
    >
      try again
    </text>
  </g>
);

export default memo(GameOver);
