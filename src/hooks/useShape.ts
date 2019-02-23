import { useRef, useState } from 'react'
import { getRandomShape, Shapes, SHAPES } from '../components/shapes'

const getRandomShapes = () => SHAPES.slice().sort(() => 0.5 - Math.random())

/** Handles logic for determining the next shape to use. */
export default () => {
  const [shape, setShape] = useState<Shapes>(getRandomShape())
  const [peekShapes, setPeekShapes] = useState<Shapes[]>([
    ...getRandomShapes(),
    ...getRandomShapes()
  ])

  const stateRef = useRef({
    peekShapes,
    setPeekShapes
  })
  stateRef.current = {
    peekShapes,
    setPeekShapes
  }

  /** Pops the next shape and sets it as the current shape state. */
  const nextShape = () => {
    // If we're running low on shapes, push more all the shapes in random order.
    while (stateRef.current.peekShapes.length <= SHAPES.length) {
      setPeekShapes([...getRandomShapes(), ...stateRef.current.peekShapes])
    }
    setShape(stateRef.current.peekShapes.pop()!)
  }

  return {
    shape,
    nextShape,
    peekShapes
  }
}
