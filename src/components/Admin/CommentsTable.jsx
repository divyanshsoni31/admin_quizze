import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../../Context/app_context';
import toast from 'react-hot-toast';

const CommentsTable = ({comment,fetchComments}) => {

    const {blog,createdAt,_id} = comment;
    const blogDate = new Date(createdAt);

    const {axios} = useAppContext();

    const approveComment = async ()=>{
      try {
        const {data} = await axios.post(`api/admin/approve-comment/`,{id:_id})
        if(data.sucess){
          toast.success(data.message)
          fetchComments()
        }else{
          toast.error(data.message)
        }

      } catch (error) {
        toast.error(error.message)
        
      }
    }


    const deleteComment = async ()=>{
      try {
        const confirm = window.confirm("Are you sure you want to delete the comment")
        if(!confirm) return;

        const {data} = await axios.post(`api/admin/delete-comment/`,{id:_id})
        if(data.sucess){
          toast.success(data.message)
          fetchComments()
        }else{
          toast.error(data.message)
        }

      } catch (error) {
        toast.error(error.message)
        
      }
    }

  return (
    <tr className='order-y border-gray-300'>
      <td className='px-6 py-4'>
        <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
        <br /><br />
        <b className='font-medium text-gray-600'>Name</b> : {comment.name}
        <br /><br />
        <b className='font-medium text-gray-600'>Comment</b> : {comment.content}
      </td>
      <td className='px-6 py-4 max-sm:hidden'>
        {blogDate.toLocaleDateString()}
      </td>
      <td className='px-6 py-4'>
        <div className='inline-flex items-center gap-4'>
           {!comment.isApproved ? 
           <img onClick={approveComment} src={assets.tick_icon} className='w-5 hover:scale-110 transition-all cursor-pointer' alt="" /> :
           <p className='text-xs border border-green-600 bg-green-100 text-green-600 px-3 py-1 rounded-full'>Approved</p>
        } 
            
            <img onClick={deleteComment} src={assets.bin_icon} className='w-5 hover:scale-110 transition-all cursor-pointer' alt="" />
        </div>
      </td>
    </tr>
  )
}

export default CommentsTable
