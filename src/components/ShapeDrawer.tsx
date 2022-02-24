import styled from "@emotion/styled";
import { FC, Reducer, useEffect, useMemo, useReducer, useRef } from "react";
import { Coordinate } from "../store/slices/blocks";
import Block from "./Block";
import { ShapeElement } from "./shapes";

export type Coordinates = Coordinate[];

interface Props {
  coordinates: Coordinates;
  shape: ShapeElement;
  x: number;
  y: number;
}

const ShapeDrawer: FC<Props> = ({ x, y, shape, coordinates }) => {
  const [{ curX, curY, oldX, oldY, oldShape }, dispatch] = useReducer(reducer, {
    curX: x,
    curY: y,
    oldX: x,
    oldY: y,
    oldShape: shape,
  });

  const animateTransformRef = useRef<SVGAnimateTransformElement>(null);
  useEffect(() => {
    let dispatched = false;
    const setNewCoordinates = () => {
      if (dispatched) {
        return;
      }
      dispatched = true;
      dispatch({ x, y, shape });
    };

    // Whenever the shape changes, do not animate the position change.
    if (shape !== oldShape) {
      return setNewCoordinates();
    }

    // Animate and update the position of the element after the animation has
    // started.
    const elem = animateTransformRef.current;
    elem?.addEventListener("beginEvent", setNewCoordinates);
    elem?.beginElement();
    return () => {
      // Clear any animations in progress and make sure the state is consistent.
      elem?.removeEventListener("beginEvent", setNewCoordinates);
      elem?.endElement();
      setNewCoordinates();
    };
  }, [x, y, shape, oldShape]);

  const blocks = useMemo(
    () =>
      coordinates.map((coord, index) => (
        <Block key={`elem_${shape.color}_${index}`} {...coord} />
      )),
    [coordinates, shape.color]
  );

  return (
    <G
      transform={`translate(${curX}, ${curY})`}
      color={shape.color}
      fill={shape.color}
    >
      <animateTransform
        ref={animateTransformRef}
        attributeName="transform"
        attributeType="XML"
        type="translate"
        from={`${oldX}, ${oldY}`}
        to={`${x}, ${y}`}
        dur="25ms"
        repeatCount="1"
        restart="whenNotActive"
      />
      {blocks}
    </G>
  );
};
const G = styled.g`
  transform-origin: 50% 50%;
`;

export default ShapeDrawer;

const reducer: Reducer<
  {
    curX: number;
    curY: number;
    oldX: number;
    oldY: number;
    oldShape: ShapeElement;
  },
  { x: number; y: number; shape: ShapeElement }
> = (state, action) => ({
  ...state,
  curX: action.x,
  curY: action.y,
  oldX: action.shape === state.oldShape ? state.curX : action.x,
  oldY: action.shape === state.oldShape ? state.curY : action.y,
  oldShape: action.shape,
});
