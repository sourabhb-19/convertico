import { Route, Routes } from 'react-router'
import './App.css'
import SignUp from './SignUp/index.page'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
