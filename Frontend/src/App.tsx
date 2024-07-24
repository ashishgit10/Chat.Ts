import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
/* import Home from './components/Home' */
import Register from './components/Register'




const App: React.FC = () => {


  return (
    <>
      <BrowserRouter>
        <Routes>
         {/*  <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Register />} />
       
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
