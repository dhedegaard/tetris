import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import WebFont from 'webfontloader'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// import * as serviceWorker from './serviceWorker'

// serviceWorker.unregister()
WebFont.load({
  google: {
    families: ['Press Start 2P&display=fallback']
  }
})
