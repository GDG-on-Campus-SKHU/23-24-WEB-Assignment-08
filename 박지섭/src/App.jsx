import './App.css'
import Topbar from './components/Topbar'
import Bottombar from './components/Bottombar'
import PokeList from './components/PokeList'

function App() {

  return (
    <div>
      <Topbar />
      <PokeList />
      <Bottombar />
    </div>
  )
}

export default App
