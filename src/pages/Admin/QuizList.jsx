import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '../../../Context/app_context'

const QuizList = () => {
  const { axios } = useAppContext();
  const [quizzes, setQuizzes] = useState([]);

  const fetchQuizzes = async () => {
    try {
      const { data } = await axios.get('/api/admin/quizzes'); // replace with your actual API
      if (data.success) {
        setQuizzes(data.quizzes);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteQuiz = async (quizId) => {
  try {
    const { data } = await axios.delete(`/api/admin/quiz/${quizId}`);
    if (data.success) {
      toast.success(data.message);
      fetchQuizzes();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1 className='text-xl font-semibold mb-4'>All Quizzes</h1>
      <div className='relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
        <table className='w-full text-sm text-gray-500'>
  <thead className='text-xs text-gray-600 text-left uppercase bg-gray-100'>
    <tr>
      <th className='px-2 py-4'>#</th>
      <th className='px-2 py-4'>Quiz Title</th>
      <th className='px-2 py-4'>Created By</th>
      <th className='px-2 py-4'>Action</th>
    </tr>
  </thead>
  <tbody>
    {quizzes.map((quiz, index) => (
      <tr key={quiz._id} className='border-t'>
        <td className='px-2 py-3'>{index + 1}</td>
        <td className='px-2 py-3'>{quiz.title}</td>
        <td className='px-2 py-3'>{quiz.createdBy?.name || 'Unknown'}</td>
        <td className='px-2 py-3'>
          <button
            onClick={() => deleteQuiz(quiz._id)}
            className='text-red-600 hover:underline'
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default QuizList;
