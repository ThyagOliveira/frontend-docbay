import { BrowserRouter, Route, Routes } from 'react-router'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import Home from './pages/Home'
import './styles/global.scss'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
