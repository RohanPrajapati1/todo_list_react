import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router";

const EditTask = () => {
  const { id } = useParams();
  const [allTask, setAllTasks] = useState([]);
  const [task, setTask] = useState(null);
  
  const [data, setData] = useState({
    title: "",
    description: "",
    image: null,
    dueDate: "",
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const dd = localStorage.getItem("data");
    const finalData = dd ? JSON.parse(dd) : [];
    setAllTasks(finalData);
    // Find the specific task based on id
    const foundTask = finalData.find((p) => p.id === parseInt(id));
    setTask(foundTask || null); // Ensure task is null if not found
  }, [id]);

  useEffect(() => {
    if (task) {
      setData((prevData) => ({ ...prevData, ...task }));
    }
  }, [task]);
  if (!task) {
    return <div>Loading task...</div>; // Show a fallback while task data loads
  }
//   console.log("data => " , data)

  function updateTask() {
    const data1 = localStorage.getItem("data");

    console.log("data1 => " , data1)

    const tasks = data1 ? JSON.parse(data1) : [];

    console.log( "tasks => " ,tasks)

    const taskIndex = tasks.findIndex((task) => task.id === data.id);

    console.log("index" , taskIndex)

    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...data };
      localStorage.setItem("data", JSON.stringify(tasks));
      toast.success("Task updated");
      navigate('/');
      
    } else {
      console.error("Task not found in local storage!");
    }
  }

  function hanldleChangeValue(e) {
    setData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  }


  return (
    <div className="mt-8">
      <form>
        <div className="space-y-12 mx-2 mt-10">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-black">Update your task</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* title */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Task
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="task"
                      name="title"
                      type="text"
                      required
                      placeholder="title"
                      value={data.title}
                      onChange={hanldleChangeValue}
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              {/* descreption */}
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  description
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="description"
                    htmlFor="description"
                    value={data.description}
                    onChange={hanldleChangeValue}
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              {/* image */}
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <input
                    htmlFor="image"
                    type="file"
                    name="image"
                    value=""
                    onChange={hanldleChangeValue}
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  />
                  Change
                </div>
              </div>

              {/* Date Input */}
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Task Date
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <input
                    htmlFor="image"
                    type="date"
                    name="dueDate"
                    value={data.dueDate}
                    onChange={hanldleChangeValue}
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    value={data.firstName}
                    onChange={hanldleChangeValue}
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    value={data.lastName}
                    onChange={hanldleChangeValue}
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={hanldleChangeValue}
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    value={data.country}
                    onChange={hanldleChangeValue}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option>United States</option>
                    <option>India</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    id="street-address"
                    name="streetAddress"
                    type="text"
                    autoComplete="street-address"
                    value={data.streetAddress}
                    onChange={hanldleChangeValue}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={data.city}
                    onChange={hanldleChangeValue}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    id="region"
                    name="state"
                    type="text"
                    autoComplete="address-level1"
                    value={data.state}
                    onChange={hanldleChangeValue}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
          >
            <a href={"/"}>Cancle</a>
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={updateTask}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
