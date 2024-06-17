import { useEffect } from 'react';
import './App.css'
import Layout from './layout/Layout'


function App() {

  useEffect(() => {
    
    const reloadFlag = localStorage.getItem("pageReloaded");

    if (
      (window.location.href === "https://cropx.sreekumarkrishnan.live/" || window.location.href === "https://cropx.sreekumarkrishnan.live") &&
      !reloadFlag
    ) {
      localStorage.setItem("pageReloaded", "true");
      window.location.reload();
    }
  }, []);
  

  return (
    <Layout/>
  )
}

export default App
