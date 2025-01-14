import React, { useState } from 'react'
// import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { createTask, deleteTask, updateTask } from '../redux/taskSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';



const Home = () => {

  const [value, setValue] = useState("");
  // const [searchParams , setSearchParams] = useSearchParams();
  // const taskId = searchParams.get("taskId");
  const [update, setUpdate] = useState(0);
  const dispatch = useDispatch();
  const [taskList, setTaskList] = useState([])
  const [indexToChange, setIndexToChange] = useState(null)
  const allTasks = useSelector((state) =>
    state.task.tasks);
  console.log(allTasks)

  function handleCreate() {

    const task = {
      content: value,
      _id: Date.now().toString(36),
    }
    if (indexToChange != null) {
      dispatch(updateTask({ index: indexToChange, value }))
      setIndexToChange(null);
    } else {

      dispatch(createTask(task));
    }
    setValue('');
  }

  function handleDelete(taskId) {
    // console.log(taskId);
    dispatch(deleteTask(taskId));
  }

  function updateTasks(value) {
    setValue(value);
    // setUpdate(1);
    //  dispatch(updateTask(indexToChange , value));
  }


  return (
    <div>

      <div
        className='min-w-[500px] flex flex-col gap-5 justify-center items-center border bg-green-400 p-5 rounded-2xl'>
        <h1
          className='text-2xl font-serif font-medium'>TODO App</h1>
        <div
          className='flex justify-evenly w-[80%]'>
          <input
            className='px-2 py-1 border border-gray-400 text-slate-500 rounded-md drop-shadow-lg'
            placeholder='Enter Task...'
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)} />

          <button
            className='py-1 px-4 rounded-md bg-cyan-400 drop-shadow-lg hover:bg-cyan-500'
            onClick={handleCreate}
          >
            {indexToChange != null ? 'update task' : 'List task'}
          </button>
        </div>

        <div className='min-w-[69%] p-5 rounded-sm border flex flex-col gap-5'>
          {
            allTasks.length > 0 &&
            allTasks.map(
              (task, index) => {
                return (
                  <div className='border rounded-sm px-2 flex justify-between items-center gap-2'>
                    {/* <input type="checkbox"/> */}
                    <p
                      className='text-lg font-serif'>
                      {task.content}
                    </p>

                    <div
                      className='flex gap-4'>

                      <button
                        onClick={() => {
                          updateTasks(task.content)
                          setIndexToChange(index)
                        }}>
                        edit
                      </button>


                      <button
                        onClick={() => handleDelete(task?._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                )
              }
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Home