import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Home from './components/Home'




const App: React.FC = () => {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Register />} />
       
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
