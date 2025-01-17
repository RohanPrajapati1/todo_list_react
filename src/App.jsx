import './App.css'
import Home from './components/Home'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {

  // const router = createBrowserRouter( [
  //   {
  //     path: "/",
  //     element: <Home />
  //   },
  //   {
  //     path:"/task",
  //     element:
  //   },
  // ]);

  return (
    <div className=''>
       {/* <RouterProvider router={router}>
        
        </RouterProvider>     */}
        <Home />
    </div>
  )
}

export default App
