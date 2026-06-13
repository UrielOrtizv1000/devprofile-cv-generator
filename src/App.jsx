import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Home />
      </main>
    </div>
  )
}

export default App
