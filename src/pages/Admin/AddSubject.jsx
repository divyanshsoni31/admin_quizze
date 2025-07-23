import React, { useState } from 'react'
import { useAppContext } from '../../../Context/app_context'
import toast from 'react-hot-toast'

const AddSubject = () => {
  const { axios } = useAppContext();
  const [subjectName, setSubjectName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!subjectName.trim()) {
      return toast.error("Subject name is required");
    }

    try {
      setIsAdding(true);

      const { data } = await axios.post(`/api/subject/add`, { subjectName });

      if (data.success) {
        toast.success(data.message);
        setSubjectName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex justify-center items-center min-h-screen bg-gray-50'>
      <div className='bg-white p-6 rounded shadow-md w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-4 text-gray-700'>Add Subject</h2>
        <input
          type="text"
          placeholder="Enter Subject Name"
          value={subjectName}
          onChange={e => setSubjectName(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded outline-none focus:border-primary mb-4'
          required
        />
        <button
          type='submit'
          disabled={isAdding}
          className='w-full bg-primary text-white py-2 rounded hover:bg-primary-dark'
        >
          {isAdding ? 'Adding...' : 'Add Subject'}
        </button>
      </div>
    </form>
  );
};

export default AddSubject;
