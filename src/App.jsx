import { useEffect } from 'react'
import './App.css'

function App() {

  useEffect(() => {
    document.title = `Music Player`
  }, [])

  return (
    <>
     <div>App</div>
    </>
  )
}

export default App
