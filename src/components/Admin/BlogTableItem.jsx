import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../../Context/app_context';
import toast from 'react-hot-toast';

const BlogTableItem = ({blog,fetchBLogs,index}) => {

    const {title,createdAt} = blog;
    const {blogDate} = new Date(createdAt)

    const {axios} = useAppContext();

    const deleteBlog = async ()=>{
      const confirm = window.confirm('Are You Sure You Want TO Delete This Blog?');
      if(!confirm) return;
      try {
        const {data} = await axios.post(`/api/blog/delete`,{id:blog._id})
        if(data.sucess){
          toast.success(data.message)
          await fetchBLogs();
        }
        else{
          toast.error(data.error)
        }
      } catch (error) {
        toast.error(error.error)
      }
    }

    const togglePublish = async ()=>{
      try {
        const {data} = await axios.post(`/api/blog/toggle-publish`,{id:blog._id})
        if(data.sucess){
            toast.success(data.message)
            await fetchBLogs();
          }
          else{
            toast.error(data.error)
          }
      } catch (error) {
        toast.error(error.error)
      }
    }

  return (
    <tr className='border-y border-gray-300'>
        <th className='px-2 py-4'>{index}</th>
        <td className='px-2 py-4'>{title}</td>
        <td className='px-2 py-4 max-sm:hidden'>{blog.createdAt ? new Date(blog.createdAt).toDateString() : "N/A"}</td>
        <td className='px-2 py-4 max-sm:hidden'>
            <p className={`${blog.isPublished ? "text-green-800" : "text-orange-700"}`}>{blog.isPublished ? 'Published' : 'Unpublished'}</p>
        </td>
        <td className='px-2 py-4 flex text-xs gap-3'>
            <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>{blog.isPublished ? 'Unpublish' : 'Publish'}</button>
            <img onClick={deleteBlog} src={assets.cross_icon} className='w-8 hover:scale-110 transition-all cursor-pointer' alt="" />
        </td>
    </tr>
  )
}

export default BlogTableItem
