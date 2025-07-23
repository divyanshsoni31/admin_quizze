import React from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import BlogPage from './pages/BlogPage'
import Layout from './pages/Admin/Layout'
import Dashboard from './pages/Admin/Dashboard'
// import AddBlog from './pages/Admin/AddBlog'
import AddSubject from './pages/admin/AddSubject'
import QuizList from './pages/Admin/QuizList'
// import Comments from './pages/Admin/Comments'
import Login from './components/Admin/Login'
import 'quill/dist/quill.snow.css'
import { Toaster } from "react-hot-toast"
// import { useAppContext } from '../Context/app_context'

const App = () => {
  // const { token } = useAppContext()

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<BlogPage />} />
        
        <Route path='/admin' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="addSubject" element={<AddSubject />} />
          <Route path="quizzes" element={<QuizList />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
