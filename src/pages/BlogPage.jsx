import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from  "moment"
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../../Context/app_context'
import toast from 'react-hot-toast'

const BlogPage = () => {
    const {id} = useParams();
    const {axios} = useAppContext();

    const  [data,setData] = useState(null);
    const  [comments,setComments] = useState([]);
    const  [name,setName] = useState('');
    const  [content,setContent] = useState('');


    const fetchBlogData = async ()=>{
        try {
          const {data} = await axios.get(`/api/blog/${id}`)
          data.sucess ? setData(data.blog) : toast.error(data.message)
        } catch (error) {
          toast.error(error.message)
        }
    }

    const fetchComments = async ()=>{
      try {
          const { data } = await axios.post('/api/blog/comments',{blogId:id})
          if(data.sucess){
            setComments(data.comments)
          }
          else{
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
    }

    const addComment = async (e)=>{
        e.preventDefault();
        try {
          const {data} = await axios.post(`/api/blog/addComment`,{blog:id,name,content})
          if(data.sucess){
            toast.success(data.message)
            setName('')
            setContent('')
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchBlogData()
        fetchComments()
    },[])
  return data ? (
    <div className='relative'>
        <img src={assets.gradientBackground} className='absolute -top-50 -z-1 opacity-50' alt="" />
        <Navbar/>

      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published On {Moment(data.ctratedAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Michal Brown</p>
      </div>
      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt="" className='rounded-3xl mb-5' />

        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{__html:data.description}}></div>

        {/* comment section */}
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
            <p className='font-semibold mb-4'>Comments ({comments.length})</p>
            <div className='flex flex-col gap-4'>
                {comments.map((item,index)=>(
                    <div key={index} className='relative bg-primary/2  border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                        <div className='flex items-center gap-2 mb-2'>
                            <img src={assets.user_icon} className='w-6' alt="" />
                            <p className='font-medium'>{item.name}</p>
                        </div>
                        <p className='text-sm max-w-md ml-8'>{item.content}</p>
                        <div className='absolute right-4 bottom flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
                    </div>
                ))}
            </div>
        </div>
      </div>

    {/* Add Comment section */}
      <div className='max-w-3xl mx-auto'>
        <p className='font-semibold mb-4'>Add Your Comment</p>
        <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg' action="">
                <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' required className=' w-full p-2 border border-gray-300 rounded outline-none' name="" id="" />
                <textarea onChange={(e)=>setContent(e.target.value)} value={content} name="" placeholder='comment' className='w-full p-2 border border-gray-300 rounded outline-none h-48' required></textarea>
                <button type='submit' className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>
        </form>
      </div>

      <div className='my-24 max-w-3xl mx-auto'>
        <p className='font-semibold my-4'> Share this artical on social media</p>
        <div className='flex'>
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.googleplus_icon} alt="" />
        </div>
      </div>
        <Footer/>

    </div>
  ) : <Loader/>
}

export default BlogPage
