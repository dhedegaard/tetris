import { memo } from 'react'
import { App } from '../App'

export const dynamic = 'force-static'

export default memo(function IndexPage() {
  return <App />
})
