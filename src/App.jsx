import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { CVProvider } from './context/CVContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Editor from './pages/Editor'
import Preview from './pages/Preview'
import Dashboard from './pages/Dashboard'
import About from './pages/About'

function App() {
  return (
    <ThemeProvider>
      <CVProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </CVProvider>
    </ThemeProvider>
  )
}

export default App
