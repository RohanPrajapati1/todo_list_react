import React, { useState } from "react";
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
  // const [done, setDone] = useState(false);
  const dispatch = useDispatch();
  // const [taskList, setTaskList] = useState([])
  const [indexToChange, setIndexToChange] = useState(null);
  const allTasks = useSelector((state) => state.task.tasks);
  console.log(allTasks);

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
    <div>
      <div className="min-w-[850px] max-screen flex flex-col gap-4 justify-center items-center border bg-emerald-300 pb-2  rounded-2xl">
        <h1 className="text-2xl font-serif font-medium">TODO App</h1>
        <div className="flex justify-evenly w-[80%] border p-2">
          <form action="" className="flex flex-col gap-2 w-[100%]">
            <input
              className="px-2 py-1 border border-gray-400 text-slate-500 rounded-md drop-shadow-lg w-[100%]"
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
              className="rounded-md p-2"
              value={subTask}
              onChange={(e) => setSubTask(e.target.value)}
            ></textarea>

            <div className="flex justify-between items-center">
              <label htmlFor="date">Task date</label>
              <input
                type="date"
                id="date"
                className="rounded-md px-2 py-1 drop-shadow-lg w-[60%]"
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
          </form>
        </div>

        <div className="min-w-[80%] p-5 rounded-sm border flex flex-col gap-5 overflow-y-scroll">
          <div className="flex justify-evenly gap-20 text-lg text-cyan-800 bg-cyan-600 ">
            {statusarr.map((it, ind) => (
              <div key={ind} className=" min-w-[350px] max-w-[400px] ">
                <h1>{it}</h1>
                {/* {console.log('ddd',allTasks.filter(it => it.status == it))} */}
                {allTasks
                  .filter((ite) => ite.status == it)
                  .map((task, index) => (
                    <div
                      key={index}
                      className="w-full border rounded-sm p-2 flex flex-col justify-between items-center gap-3 h-[200px] bg-white text-black"
                    >
                      <select
                        name="status"
                        id=""
                        className="bg-inherit"
                        onChange={(e) => handleUpdateTask(e.target.value, task)}
                      >
                        {statusarr.map((it) => (
                          <option key={it} value={it}>
                            {it}
                          </option>
                        ))}
                      </select>
                      <div>
                        <p className="text-lg font-serif underline underline-offset-1">
                          {task.content}
                        </p>
                        <p>{task.subTask}</p>
                        <p className="font-light">{task.date}</p>
                      </div>

                      <div className="flex flex-row justify-between gap-8 ">
                        <button
                          onClick={() => {
                            updateTasks(task.content, task.date, task.subTask);
                            setIndexToChange(index);
                          }}
                        >
                          edit
                        </button>

                        <button onClick={() => handleDelete(task?._id)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
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
