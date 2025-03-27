import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { useState } from "react"

function App() {
  const [showCtaAlert, setShowCtaAlert] = useState(!(localStorage.getItem("Bottom-CTA-Closed")));
  const handleClose=()=>{
      setShowCtaAlert(false);
      localStorage.setItem("Bottom-CTA-Closed", "true");
  }
  return (
    <>
      <div className="max-w-screen-2xl mx-auto max-h-screen overflow-y-auto custom_scrollbar" id="main_id">
        <Router basename='/'>
          <Routes>
            <Route path='/' element={<HomePage showCtaAlert={showCtaAlert} handleClose={handleClose} />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
