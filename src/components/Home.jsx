import React, { useRef, useState } from "react";
import "../components/home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "../redux/taskSlice";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Home = () => {
  const [value, setValue] = useState("");
  const [subTask, setSubTask] = useState("");
  const [taskDate, setTaskDate] = useState(null);
  const [taskStatus, setTaskStatus] = useState("pending");
  const dispatch = useDispatch();

  const [indexToChange, setIndexToChange] = useState(null);
  const allTasks = useSelector((state) => state.task.tasks);

  function handleCreate() {
    const task = {
      content: value,
      subTask: subTask,
      _id: Date.now().toString(36),
      date: taskDate,
      status: taskStatus,
    };
    if (indexToChange != null) {
      dispatch(
        updateTask({
          index: indexToChange,
          value,
          taskDate,
          subtask: subTask,
          status: taskStatus,
        })
      );
      setIndexToChange(null);
    } else {
      dispatch(createTask(task));
    }
    setValue("");
    setTaskDate(null);
    setSubTask("");
  }

  function handleDelete(taskId) {
    dispatch(deleteTask(taskId));
  }

  function updateTasks(value, date, subTask) {
    setValue(value);
    setTaskDate(date);
    setSubTask(subTask);
  }
  function handleUpdateTask(value, item) {
    dispatch(updateTaskStatus({ value, item }));
  }

  const statusarr = ["pending", "inProgress", "completed"];

  return (
    <div className=" w-full  ">
      <div className="   sm:mx-auto  border  p-2  rounded-2xl ">
        
        <div className=" max-w-2xl mx-auto ">
          <h1 className="text-xl font-serif font-medium text-black">
            TODO App
          </h1>
          <div className="  border rounded-lg p-2">
            <input
              className="px-2 py-1 border border-gray-400 text-slate-500 rounded-md drop-shadow-lg w-full"
              placeholder="Title of Task..."
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <textarea
              name=""
              id=""
              placeholder="Enter Tasks"
              minLength={20}
              className="border border-gray-400 drop-shadow-lg rounded-md p-2"
              value={subTask}
              onChange={(e) => setSubTask(e.target.value)}
            ></textarea>

            <div className="">
              <label htmlFor="date">Task date</label> <br/>
              <input
                type="date"
                id="date"
                className="rounded-md px-2 py-1 drop-shadow-lg "
                value={taskDate}
                onChange={(e) => {
                  setTaskDate(e.target.value);
                }}
              />
            </div>

            <button
              type="reset"
              className="py-1 px-4 rounded-md bg-cyan-400 drop-shadow-lg hover:bg-cyan-500"
              onClick={handleCreate}
            >
              {indexToChange != null ? "update task" : "List task"}
            </button>
          </div>
        </div>

        <div  className=" rounded-sm border overflow-y-scroll mt-4">
          <div
            id="list-container"
            className="flex flex-col sm:flex-row justify-center  text-lg text-cyan-800 "
          >
            {statusarr.map((it, ind) => (
              <div
                id="status-container"
                key={ind}
                className=" min-w-[300px] max-w-[400px] flex flex-col gap-3 bg-red-100 p-2 "
              >
                <h1>{it}</h1>
                {/* {console.log('ddd',allTasks.filter(it => it.status == it))} */}
                {allTasks
                  .filter((ite) => ite.status == it)
                  .map((task, index) => (
                    <div
                      id="task-container"
                      key={index}
                      className=" border border-sky-300 rounded-lg p-4  min-h-[150px] bg-white text-black "
                    >
                      <select
                        name="status"
                        id=""
                        className=" text-lg border p-2 rounded-md w-full"
                        onChange={(e) => handleUpdateTask(e.target.value, task)}
                      >
                        {statusarr.map((it) => (
                          <option key={it} value={it}>
                            {it}
                          </option>
                        ))}
                      </select>

               

                        <p className=" text-lg font-sans capitalize">
                          {task.content}
                        </p>
                        <p className="text-gray-600 text-sm font-sans">
                          {task.subTask}
                        </p>
                    <div className=" flex item-center justify-between mt-2">

                      <p className="font-light ">
                        {task.date}
                      </p>
                      <div className="flex item-center gap-x-2">
                        <button
                          onClick={() => {
                            updateTasks(task.content, task.date, task.subTask);
                            setIndexToChange(index);
                          }}
                          className=""
                        >
                          edit
                        </button>

                        <button onClick={() => handleDelete(task?._id)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
