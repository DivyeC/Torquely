import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'

const Navbar = () => {

    const {setShowLogin, user, logout, isOwner, axios, setIsOwner} = useAppContext()

    const location = useLocation()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const changeRole = async ()=>{
        try {
            const { data } = await axios.post('/api/owner/change-role')
            if (data.success) {
                setIsOwner(true)
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <motion.div 
    initial={{y: -20, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 0.5}}
    className={`w-screen  z-11 flex items-center justify-between px-32 md:px-32 lg:px-32 xl:px-32 py-4 text-gray-600 border-b border-borderColor transition-all bg-light`}>

        <Link to='/'>
            <motion.img initial={{scale: 1.5}} whileHover={{scale: 1.55}} src={assets.logo} alt="logo" className="h-8"/>
        </Link>

        <motion.div initial={{ }} 
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 bg-light"} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
            {menuLinks.map((link, index)=> (
                <Link key={index} to={link.path}>
                    {link.name}
                </Link>
            ))}

            {/* <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56'>
                <input type="text" className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" placeholder="Search cars"/>
                <img src={assets.search_icon} alt="search" />
            </div> */}
        <div className='w-4'> </div>
            <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>

                <button onClick={()=> isOwner ? navigate('/owner') : changeRole()} className="cursor-pointer">{isOwner ? 'Dashboard' : 'List cars'}</button>

                <button onClick={()=> {user ? logout() : setShowLogin(true)}} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg">{user ? 'Logout' : 'Login'}</button>
            </div>
        </motion.div>

        <button className='sm:hidden cursor-pointer' aria-label="Menu" onClick={()=> setOpen(!open)}>
            <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
        </button>
      
    </motion.div>
  )
}

export default Navbar
