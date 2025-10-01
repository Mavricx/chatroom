import React from 'react'
import {LandingPage,Home} from './pages';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
function App() {

  return (
     <Router>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
     </Router>
  )
}

export default App
