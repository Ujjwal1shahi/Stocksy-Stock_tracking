import { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
     <div className="min-h-screen w-full">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/search" element={<h1>Search</h1>} />
        <Route path="/watchlist" element={<h1>WatchList</h1>} />
      </Routes>
    </div>
  )
}

export default App
