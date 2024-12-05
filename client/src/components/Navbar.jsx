import React from 'react'
import { NavLink } from 'react-router'
const Navbar = ({admin}) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-4 px-10 flex items-center justify-between shadow-lg">
        <NavLink to={admin?"/admin":"/"} className="text-2xl font-bold tracking-wider">Blog.In</NavLink>
        <div>
          <NavLink
            onClick={()=>{
                if(admin){
                    localStorage.removeItem("token");
                }
            }}
            to={admin?"/":"/login"}
            className="text-lg font-medium hover:underline hover:text-gray-300 transition"
          >
            {
                admin?"Logout":"Login"
            }
          </NavLink>
        </div>
      </div>
  )
}

export default Navbar