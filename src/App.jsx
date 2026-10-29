import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ScrollToTop from './components/common/ScrollToTop'
export default function App() {
  return (
   <BrowserRouter>
   <ScrollToTop/>
   <Navbar/>
   <AppRoutes/>
   <Footer/>
   </BrowserRouter>
  )
}


