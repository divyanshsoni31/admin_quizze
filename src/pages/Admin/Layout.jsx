// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Sidebar from '../../components/Admin/Sidebar'
// import { useAppContext } from '../../../Context/app_context'
// import logo from 'C:\Users\Nishi\Desktop\admin site\blogsy\front-end\src\assets\logo.png'

// const Layout = () => {
//   const { setToken, axios, navigate } = useAppContext()

//   const logout = () => {
//     localStorage.removeItem('token')
//     axios.defaults.headers.common['Authorization'] = null
//     setToken('')
//     navigate('/')
//   }

//   return (
//     <>
//       <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
//         <div
//           className='flex items-center gap-2 cursor-pointer'
//           onClick={() => navigate('/')}
//         >
//           <img src={logo} className='w-8 h-8' alt='Quizze Logo' />
//           <h1 className='text-xl font-semibold text-gray-800'>Quizze</h1>
//         </div>

//         <button
//           className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'
//           onClick={logout}
//         >
//           Logout
//         </button>
//       </div>

//       <div className='flex h-[calc(100vh-70px)]'>
//         <Sidebar />
//         <Outlet />
//       </div>
//     </>
//   )
// }

// export default Layout


import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Admin/Sidebar'
import { useAppContext } from '../../../Context/app_context'
import logo from '../../assets/logo1.png' // ✅ fixed import path

const Layout = () => {
  const { setToken, axios, navigate } = useAppContext()

  const logout = () => {
    localStorage.removeItem('token')
    axios.defaults.headers.common['Authorization'] = null
    setToken('')
    navigate('/')
  }

  return (
    <>
      <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        {/* <div
          className='flex items-center gap-2 cursor-pointer'
          onClick={() => navigate('/')}
        >
          <img src={logo} className='w-8 h-8' alt='Quizze Logo' />
          <h1 className='text-xl font-semibold text-gray-800'>Quizze</h1>
        </div> */}
        <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate('/')}>
  <img src={logo} className='w-14 h-14' alt='Quizze Logo' />
  {/* <h1 className='text-2xl font-bold text-black'>Quizze</h1> */}
</div>


        <button
          className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default Layout
