import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux-toolkit/userSlice'
import AdminHome from './AdminHome'
import UserHome from './UserHome'

function Index() {
  const user = useSelector(selectUser)
  return (
    <div>
        {user.admin ? <AdminHome />: <UserHome/>}
        
    </div>
  )
}

export default Index
