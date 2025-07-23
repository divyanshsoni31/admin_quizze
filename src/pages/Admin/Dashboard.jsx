import React, { useEffect, useState } from 'react'
//import { assets } from '../../assets/assets'
//import { useAppContext } from '../../../Context/app_context'
//import toast from 'react-hot-toast'

const Dashboard = () => {
  const [selectedRole, setSelectedRole] = useState('all')
  const [users, setUsers] = useState([])

  //const { axios } = useAppContext()

  const fetchUsers = async (type) => {
  const mockData = {
    creator: [
      { _id: '1', username: 'AliceCreator', email: 'alice@creator.com', status: 'Creator' },
      { _id: '2', username: 'BobCreator', email: 'bob@creator.com', status: 'Creator' },
    ],
    student: [
      { _id: '3', username: 'CharlieStudent', email: 'charlie@student.com', status: 'Student' },
      { _id: '4', username: 'DanaStudent', email: 'dana@student.com', status: 'Student' },
    ]
  }

  let result = []
  if (type === 'all') {
    result = [...mockData.creator, ...mockData.student]
  } else {
    result = mockData[type]
  }

  setTimeout(() => {
    setUsers(result)
  }, 300)
}



  useEffect(() => {
  fetchUsers('all')
}, [])


  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      {/* Dropdown Menu */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">Select User Type</label>
        <select
  value={selectedRole}
  onChange={(e) => {
    setSelectedRole(e.target.value)
    fetchUsers(e.target.value)
  }}
  className='mb-4 p-2 border rounded-md bg-white text-gray-700'
>
  <option value="all">All Users</option>
  <option value="creator">Creators</option>
  <option value="student">Students</option>
</select>

      </div>

      {/* User Table */}
      <div className='relative overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-600 text-left uppercase bg-gray-100'>
            <tr>
              <th className='px-2 py-4'>#</th>
              <th className='px-2 py-4'>Username</th>
              <th className='px-2 py-4'>Email</th>
              <th className='px-2 py-4'>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className='px-2 py-3'>{index + 1}</td>
                  <td className='px-2 py-3'>{user.username || user.name}</td>
                  <td className='px-2 py-3'>{user.email}</td>
                  <td className='px-2 py-3 capitalize'>{user.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
