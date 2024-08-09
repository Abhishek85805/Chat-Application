import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ChatProvider from './Context/ChatProvider.jsx'
import { ChatPageProvider } from './Context/ChatPageContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChatProvider>
      <ChatPageProvider>
        <App />
      </ChatPageProvider>
    </ChatProvider>
  </BrowserRouter>
)
