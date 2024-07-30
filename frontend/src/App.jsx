import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import Chat from './pages/Chat'


function App() {
  return (
    <div className='h-screen bg-home-page bg-cover bg-center bg-no-repeat bg-fixed'>
      <Toaster/>
      <Routes >
        <Route path='/' element={<Home/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </div>
  )
}

export default App
