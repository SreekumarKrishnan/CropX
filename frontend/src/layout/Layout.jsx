import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Routers from '../routes/Routers'
import { useLocation } from 'react-router-dom';

const Layout = () => {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');


  return (

    <>
     {isAdminRoute ? null : <Header />}
      <main>
        <Routers />
      </main>
      {isAdminRoute ? null : <Footer />}
    </>
  )
}

export default Layout