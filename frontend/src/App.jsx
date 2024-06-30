import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import {Toaster} from 'sonner';
import Chat from './components/Chat';
import User from './components/User';
import SearchFriend from './components/SearchFriend';

function App() {
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}>
          <Route index element={<Chat/>}/>
          <Route path='/search-friend' element={<SearchFriend/>}/>
          <Route path='/user' element={<User/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
