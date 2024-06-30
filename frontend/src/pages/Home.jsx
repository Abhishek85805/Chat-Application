import {Link, Outlet} from 'react-router-dom';

function Home() {
    return (
      <div className="h-screen flex flex-row">
        <div style={{width: '10%'}} className="h-full flex flex-col shadow-md">
          <div className='shadow-sm p-3 mb-1'>
            <Link to='/'>Message</Link>
          </div>
          <div className='shadow-sm p-3 mb-1'>
            <Link to='/search-friend'>Search For friend</Link>
          </div>
          <div className='shadow-sm p-3 mb-1'>
            <Link to='/user'>Profile</Link>
          </div>
        </div>
        <div style={{width: '90%'}}>
          <Outlet/>
        </div>
      </div>
      
    )
}

export default Home