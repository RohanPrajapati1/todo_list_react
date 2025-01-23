import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const ViewTask = () => {
  const { id } = useParams();
  const [allTask, setAllTasks] = useState([]);

  useEffect(() => {
    let dd = localStorage.getItem("data");
    const finalData = dd ? JSON.parse(dd) : [];
    setAllTasks(finalData);
  }, [id]);

  const task = allTask.filter((p) => p.id === parseInt(id));

  if (task.length === 0) {
    return <div>Loading task...</div>; // Show a fallback while task data loads
  }

  // console.log("ID:", id);
  // console.log("All Tasks:", allTask);
  // console.log("Selected Task:", task[0]);

  // for(let key in task[0]){
  //   console.log("keys" , key , "value => " , task[0][key])
  // }


  return (
    <div className="px-3">
      <div className="mt-8 px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">
          Your Task
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          Task details and Personal.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Title</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {task[0].title}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Description
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {task[0].description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Due Date
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {task[0].dueDate}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Name
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {task[0].firstName} {task[0].lastName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {task[0].email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Country</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {task[0].country}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Street Address</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {task[0].streetAddress}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">City</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {task[0].city}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">State</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {task[0].state}
            </dd>
          </div>
        </dl>
        <img src={task[0].image} 
         alt="User"
         style={{
           width: "50px",
           height: "50px",
           borderRadius: "50%",
           objectFit: "cover",
         }} />
         <button
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <a href={`/createTask/${task[0].id}`}>
          Edit
          </a>
         </button>
      </div>
    </div>
  );
};

export default ViewTask;
