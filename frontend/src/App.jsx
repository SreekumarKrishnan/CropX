import { useEffect } from 'react';
import './App.css'
import Layout from './layout/Layout'


function App() {

  useEffect(() => {
    // Check if the current URL is "http://localhost:5173/"
    const reloadFlag = localStorage.getItem("pageReloaded");

    if (
      (window.location.href === "http://localhost:5173/" || window.location.href === "http://localhost:5173") &&
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
