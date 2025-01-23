import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import CreateTask from './components/CreateTask'
import ViewTask from './components/ViewTask'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EditTask from './components/EditTask'

function App() {

  const router = createBrowserRouter( [
    {
      path: "/",
      element: 
      <div>
         <Navbar />
         <Home />
      </div>
    },
    {
      path:"/:id",
      element:
      <div>
         <Navbar />
         <ViewTask />
      </div>
    },
    {
      path: "/createTask",
      element:
      <div>
        <Navbar />
        <CreateTask />
      </div>
    },
    {
      path: "/createTask/:id",
      element:
      <div>
        <Navbar />
        <EditTask />
      </div>
    }
  ]);

  return (
    <div className=''>
       <RouterProvider router={router}>
        
        </RouterProvider>    
        {/* <Home /> */}
    </div>
  )
}

export default App
