import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import WebFont from 'webfontloader'
import * as serviceWorker from './serviceWorker'

const rootElem = document.getElementById('root')

if (rootElem != null && rootElem.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElem)
} else {
  ReactDOM.render(<App />, rootElem)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// import * as serviceWorker from './serviceWorker'
serviceWorker.register()

WebFont.load({
  google: {
    families: ['Press Start 2P&display=auto']
  }
})
