import React, {useState} from 'react'

function SearchFriend() {
    const [search, setSearch] = useState("");

    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        const friend = await axios.post('http://localhost:3000/api/user/search-user', {username: search}, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        console.log(friend.data);
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div>
      <div>

      </div>
      <div>
        <div>
          <h1></h1>
          <h3></h3>
          <form onSubmit={handleSubmit}>
            <input 
            name='search'
            type="text" 
            placeholder='Search For a Friend'
            onChange={(e)=> setSearch(e.target.value)}
            />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchFriend