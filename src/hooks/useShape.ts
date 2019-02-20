import { useState } from 'react'
import { getRandomShape, Shapes } from '../components/shapes'

export default () => {
  const [shape, setShape] = useState<Shapes>(getRandomShape())

  const nextShape = () => setShape(getRandomShape())

  return {
    shape,
    nextShape
  }
}
