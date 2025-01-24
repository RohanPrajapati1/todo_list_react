import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <div className='container flex gap-4 justify-center items-center fixed top-0 left-0 right-0 bg-sky-600 h-9'>
        <NavLink
        to='/'
        className={'text-black text-xl'} >
            Home
        </NavLink>
        
        <NavLink
        to='/createTask'
        className={'text-black text-xl'} 
        >
            Create ToDo
        </NavLink>

        {/* <NavLink
        to='/viewTask'>

        </NavLink> */}
      </div>

    </div>
  )
}

export default Navbar
