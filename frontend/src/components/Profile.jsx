import React from 'react'

function Profile({openProfile}) {
  return (
    <div className={`fixed top-[50%] left-[50%] translate-x-[-50%] ${!openProfile && 'hidden'}`}>
        Profile
    </div>
  )
}

export default Profile