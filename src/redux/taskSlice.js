import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
  tasks: localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  :[]
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask: (state , action) => {
      const task = action.payload;
      if(task === ''){

      }
      else {
        state.tasks.push(task);
        localStorage.setItem("tasks" ,
          JSON.stringify(state.tasks)
        );
        toast.success("task created successfully")
      }
     
      
    },
    deleteTask: (state , action) => {
      const taskId = action.payload;
      // console.log(taskId);

      const index = state.tasks.findIndex((item)=>
      item._id === taskId);
      // console.log(index)

      if(index >= 0 ) {
        state.tasks.splice(index , 1);

        localStorage.setItem("tasks" , JSON.stringify
          (state.tasks)
        );
        toast.success('Task deleted');
      }
      
    },
    // incrementByAmount: (state, action) => {
    //   state.tasks += action.payload
    //   // console.log(object)
    // },
  },
})

// Action creators are generated for each case reducer function
export const { createTask, deleteTask } = taskSlice.actions

export default taskSlice.reducer