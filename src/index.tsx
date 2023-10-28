import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/app'
import ErrorBoundary from './error-boundary/errorBoundary'
import '@/styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ErrorBoundary>
  ,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);