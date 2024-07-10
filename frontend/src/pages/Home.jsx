import {Link, Outlet} from 'react-router-dom';
import NavbarComponent from '../components/Navbar/Navbar';

function Home() {
    return (
      <div className='h-screen flex flex-col'>
          <div>
            <NavbarComponent/>
          </div>
          <div className='flex-grow'>
            <Outlet/>
          </div>
      </div>
    )
}

export default Home