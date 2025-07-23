import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Quizlist from '../components/Bloglist'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar/>
      <Header/>
      <Quizlist/>
      <Newsletter/>
      <Footer/>
    </>
  )
}

export default Home
