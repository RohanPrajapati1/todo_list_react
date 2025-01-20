import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  tasks: localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    createTask: (state, action) => {
      const task = action.payload;
      console.log(task);
      state.tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      toast.success("task created successfully");
    },

    updateTask: (state, action) => {
      const { index, value, taskDate, subtask, status } = action.payload;
      state.tasks[index] = {
        id: Date,
        content: value,
        date: taskDate,
        subTask: subtask,
        status: status,
      };
      // console.log(action.payload.value)

      if (action.payload.value) {
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        toast.success("task created successfully");
      }
    },

    updateTaskStatus: (state, action) => {
      const { value, item } = action.payload;
      // const arr = state.tasks.map((it) => {
      //   if (it._id == item._id) {
      //     it.status = value;
      //   }
      // });

      const inde = state.tasks.findIndex((it) => it._id == item._id);
      state.tasks[inde].status = value;

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      toast.success("task status updated");
    },

    deleteTask: (state, action) => {
      const taskId = action.payload;
      const index = state.tasks.findIndex((item) => item._id === taskId);

      if (index >= 0) {
        state.tasks.splice(index, 1);

        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        toast.success("Task deleted");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { createTask, deleteTask, updateTask, updateTaskStatus } =
  taskSlice.actions;

export default taskSlice.reducer;
