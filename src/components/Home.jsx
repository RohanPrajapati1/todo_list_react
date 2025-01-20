import React, { useRef, useState, useEffect } from "react";
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
  // const [value, setValue] = useState("");
  // const [subTask, setSubTask] = useState("");
  // const [taskDate, setTaskDate] = useState(null);
  const [taskStatus, setTaskStatus] = useState("pending");
  const dispatch = useDispatch();
  const dragItem = useRef();
  const dragContainer = useRef();
  const dragItemIndex = useRef();
  const [isEdit,setIsEdit]=useState(false)
  const [dataToEdit,setDataToEdit]=useState({})
  // const [indexToChange, setIndexToChange] = useState(null);
  const [idToChange , setIdToChange] = useState(null);
  // const allTasks = useSelector((state) => state.task.tasks);

  const [collecteddata, setCollectedData] = useState({
    name: "",
    description: "",
    dueDate: "",
    status: "pending",
  });
  const [allTasks1, setAllTasks] = useState([]);

  function addTask() {
    if(idToChange){
      // let arr = allTasks1.map((item, ind) => {
      //   if (id == item.id) {
      //     return Object.assign(item, params);
      //   }        
      // });
      const index = allTasks1.findIndex((item) => 
        item.id == idToChange
      )
      console.log('ddd--',idToChange, index,allTasks1)
      if(index==-1)
        return
      let arr=allTasks1
      arr[index] = {name:collecteddata.name,dueDate:collecteddata.dueDate ,description:collecteddata.description ,id:idToChange , status:"pending"}

      // allTasks1[index].name = collecteddata.name;
      // allTasks1[index].dueDate = collecteddata.dueDate
      // allTasks1[index].description = collecteddata.description;
      localStorage.setItem("data", JSON.stringify(arr));
      setAllTasks(arr)
      setIdToChange(null);
    }
    else{
      collecteddata.id = Date.now();
      let arr = [...allTasks1, collecteddata];
      localStorage.setItem("data", JSON.stringify(arr));
      setAllTasks((pre) => [...pre, collecteddata]);
    }
   
  }

  useEffect(() => {
    let dd = localStorage.getItem("data");
    const finalData = dd ? JSON.parse(dd) : [];
    setAllTasks(finalData);
  }, []);

  async function updateTask(id, params) {
    let arr = allTasks1.map((item, ind) => {
      if (id == item.id) {
        return Object.assign(item, {status:params});
      }
    });
    console.log(arr)
    setAllTasks(arr);
    console.log(allTasks1)
  }

  function deleteTask(id) {
    const arr = allTasks1.filter((it) => it.id != id);
    setAllTasks(arr);
  }

  // function handleCreate() {
  //   const task = {
  //     content: value,
  //     subTask: subTask,
  //     _id: Date.now().toString(36),
  //     date: taskDate,
  //     status: taskStatus,
  //   };
  //   if (indexToChange != null) {
  //     dispatch(
  //       updateTask({
  //         index: indexToChange,
  //         value,
  //         taskDate,
  //         subtask: subTask,
  //         status: taskStatus,
  //       })
  //     );
  //     setIndexToChange(null);
  //   } else {
  //     dispatch(createTask(task));
  //   }
  //   setValue("");
  //   setTaskDate(null);
  //   setSubTask("");
  // }

  function handleDelete(taskId) {
    dispatch(deleteTask(taskId));
  }

  function updateTasks(value, date, subTask , id) {
    setCollectedData({ name: value, dueDate: date, description: subTask });
    setIdToChange(id);
  }

  function handleUpdateTask(value, item) {
    // console.log(value)
    // console.log(item)
    dispatch(updateTaskStatus({ value, item }));
  }

  const handleDragStart = (e, item, container, itemIndex) => {
    e.target.style.opacity = "0.5";
    dragItem.current = item;

    //Status
    dragContainer.current = container;
    //Task card
    dragItemIndex.current = itemIndex;
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDrop = (e, targetContainer) => {
    e.preventDefault();
    const item = dragItem.current;
    dispatchUpdate(targetContainer, item);
  };

  function dispatchUpdate(value, item) {
    console.log(value);
    console.log(item);
    dispatch(updateTaskStatus({ value, item }));
  }

  const handlePrevent = (e) => {
    e.preventDefault();
  };

  function handleInputCahne(e) {
    setCollectedData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
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
              value={collecteddata.name}
              name="name"
              onChange={handleInputCahne}
            />

            <textarea
              name="description"
              id=""
              placeholder="Enter Tasks"
              minLength={20}
              className="border border-gray-400 drop-shadow-lg rounded-md p-2"
              value={collecteddata.description}
              onChange={handleInputCahne}
            ></textarea>

            <div className="">
              <label htmlFor="date">Task date</label> <br />
              <input
                type="date"
                id="date"
                name="dueDate"
                className="rounded-md px-2 py-1 drop-shadow-lg "
                value={collecteddata.dueDate}
                onChange={handleInputCahne}
              />
            </div>

            <button
              type="button"
              className="py-1 px-4 rounded-md bg-cyan-400 drop-shadow-lg hover:bg-cyan-500"
              onClick={addTask}
            >
              {idToChange != null ? "update task" : "List task"}
            </button>
          </div>
        </div>

        <div className=" rounded-sm border overflow-y-scroll mt-4">
          <div
            id="list-container"
            className="flex flex-col sm:flex-row justify-center  text-lg text-cyan-800 "
          >
            {statusarr.map((it, ind) => (
              <div
                onDragOver={handlePrevent}
                onDrop={(e) => handleDrop(e, it)}
                id="status-container"
                key={ind}
                className=" min-w-[300px] max-w-[400px] flex flex-col gap-3 bg-red-100 p-2 "
              >
                <h1>{it}</h1>
                {/* {console.log('ddd',allTasks.filter(it => it.status == it))} */}
                {allTasks1
                  .filter((ite) => ite.status == it)
                  .map((task, index) => (
                    <div
                      onDragStart={(e) => handleDragStart(e, task, it, index)}
                      onDragEnd={handleDragEnd}
                      draggable
                      id="task-container"
                      key={index}
                      className=" border border-sky-300 rounded-lg p-4  min-h-[150px] bg-white text-black "
                    >
                      <select
                        name="status"
                        id=""
                        className=" text-lg border p-2 rounded-md w-full"
                        onChange={(e) => updateTask(task.id , e.target.value)}
                      >
                        {/* <option  disabled selected>Status</option> */}
                        {statusarr.map((it) => (
                          <option key={it} value={it}>
                            {it}
                          </option>
                        ))}
                      </select>

                      <p className=" text-lg font-sans capitalize">
                        {task.name}
                      </p>
                      <p className="text-gray-600 text-sm font-sans">
                        {task.description}
                      </p>
                      <div className=" flex item-center justify-between mt-2">
                        <p className="font-light ">{task.dueDate}</p>
                        <div className="flex item-center gap-x-2">
                          <button
                            onClick={() => {
                              updateTasks(
                                task.name,
                                task.dueDate,
                                task.description,
                                task.id
                              );
                              
                            }}
                          >
                            edit
                          </button>

                          <button onClick={() => deleteTask(task.id)}>
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
