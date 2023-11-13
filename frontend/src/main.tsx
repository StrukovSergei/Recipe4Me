import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import { router } from './router'

import App from './App.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>


      <RouterProvider router={router} />

  </React.StrictMode>,

)
