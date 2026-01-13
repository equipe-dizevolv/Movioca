import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Import CSS files
import './assets/css/animate.min.css'
import './assets/css/animation.css'
import './assets/css/bootstrap.css'
import './assets/css/bootstrap-select.min.css'
import './assets/css/swiper-bundle.min.css'
import './assets/css/styles.css'

// Import Font
import './assets/font/fonts.css'

// Import Icon
import './assets/icon/style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
