import React, { useState } from 'react';
import { assets, menuLinks } from '../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-role');
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor transition-all ${location.pathname === '/' ? 'bg-light' : 'bg-white'} z-20 relative`}
    >
      {/* Logo */}
      <Link to='/'>
        <motion.img
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          src={assets.logo}
          alt='logo'
          className='h-8'
        />
      </Link>

      {/* Mobile menu button */}
      <button className='sm:hidden cursor-pointer z-50' onClick={() => setOpen(!open)}>
        <img src={open ? assets.close_icon : assets.menu_icon} alt='menu' />
      </button>

      {/* Menu Items */}
      <div
        className={`max-sm:fixed max-sm:top-0 max-sm:right-0 max-sm:h-screen max-sm:w-3/4 max-sm:bg-white max-sm:shadow-lg max-sm:p-6 sm:static sm:flex sm:flex-row sm:items-center sm:gap-8 transition-all duration-300 z-40 ${
          open ? 'max-sm:translate-x-0' : 'max-sm:translate-x-full'
        } flex flex-col sm:flex-row items-start sm:items-center gap-6`}
      >
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path} onClick={() => setOpen(false)}>
            {link.name}
          </Link>
        ))}

        <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
          <button
            onClick={() => {
              if (isOwner) navigate('/owner');
              else changeRole();
              setOpen(false);
            }}
            className='cursor-pointer'
          >
            {isOwner ? 'Dashboard' : 'List cars'}
          </button>

          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
              setOpen(false);
            }}
            className='cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg'
          >
            {user ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>

      {/* Optional: Backdrop for mobile */}
      {open && (
        <div
          className='fixed top-0 left-0 w-full h-screen bg-black bg-opacity-40 z-30 sm:hidden'
          onClick={() => setOpen(false)}
        />
      )}
    </motion.div>
  );
};

export default Navbar;
