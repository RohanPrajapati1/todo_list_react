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
      console.log(action.payload)
      if(action.payload.content){
        state.tasks.push(task);
        localStorage.setItem("tasks" ,
          JSON.stringify(state.tasks)
        );
        toast.success("task created successfully")
      }

      
    },
    updateTask: (state , action) => {
      const {index,value}=action.payload  

    state.tasks[index]={id:Date,content:value}

      if(action.payload.content){
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
    // updateTask(state, action){
      
    // },
  },
})

// Action creators are generated for each case reducer function
export const { createTask, deleteTask ,updateTask } = taskSlice.actions

export default taskSlice.reducer