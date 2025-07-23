import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../../Context/app_context'

const Header = () => {

    const {setInput,input} = useAppContext()
    const inputRef = useRef()

    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        setInput(inputRef.current.value)
    }
    const onClear = ()=>{
        setInput('')
        inputRef.current.value = ''
    }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className='text-center mt-20 mb-8'>
            <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
                <p>New AI feature integrated</p>
                <img src={assets.star_icon} className='w-2.5' alt="" />
            </div>

            <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>Your Own <span className='text-primary'>Blogging</span> <br /> Plateform.</h1>
            <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>This is your space to think out loude, to share what matters, and to 
                write without fillters. Wheater it's one word or one thousand, your story
                starts right hear.
            </p>
            <form onSubmit={onSubmitHandler} action="" className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
                <input ref={inputRef} className='w-full p-4 outline-none' type="text" placeholder='Search for blogs' required />
                <button className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer' type='submit'>Search</button>
            </form>
        </div>
        <div className='text-center'>
            {input &&<button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>Clear Search</button>}
        </div>
        <img src={assets.gradientBackground} className='absolute -top-50 -z-1 opacity-50' alt="" />
    </div>
  )
}

export default Header
