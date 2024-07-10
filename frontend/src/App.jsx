import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import {Toaster} from 'sonner';
import Chat from './components/Chat';
import Profile from './components/Profile';
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
          <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
