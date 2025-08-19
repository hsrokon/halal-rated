import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom'; 
import { TbLogout } from 'react-icons/tb';
import { AnimatePresence, motion } from "framer-motion";
import useAuth from '../hooks/useAuth';


const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logOutUser } = useAuth()

  // user drop down and focusring handle 
  const dropdownRef = useRef(null);
  const userButtonRef = useRef(null);
  useEffect(()=>{
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
      userButtonRef.current && !userButtonRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside)
  },[])

  const handleLogOut = () => {
    logOutUser()
    .then()
    .catch(error => {
      console.log("Sign out error", error);
    })
  }

  const navItemClasses = ({ isActive }) =>
  `block py-2 px-2 rounded-md transition-all duration-150 ${
    isActive ? 'bg-primary text-white' : ''
  }`;

  const routeToLabel = (path) => {
  return path
    .replace(/^\//, '')                          // remove leading slash
    .replace(/([A-Z])/g, ' $1')                  // add space before caps
    .replace(/\b\w/g, char => char.toUpperCase())// capitalize each word
    .trim();
};


  return (
    <nav className="bg-white border-gray-200 font-poppins">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={'https://i.ibb.co/tp2thjR1/tr-ffl.png'} className="h-9" alt="Logo" />
        </a>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {
            !user && <div className='md:space-x-2'>
            <Link to={'/auth/login'} ><button className='btn btn-sm lg:btn-md border-0 bg-primary text-white rounded-lg'>Login</button></Link>
            <Link to={'/auth/signup'} ><button className='hidden md:inline-block btn lg:btn-md btn-sm md:border-2 border-primary text-primary rounded-lg'>Sign Up</button></Link>
          </div>
          }
          
          {
            user && <button
            ref={userButtonRef}
            type="button"
            // md:me-0 
            className={`flex text-sm bg-gray-800 ${isUserDropdownOpen && 'focus:ring-4 focus:ring-green-600'} rounded-full`}
            onClick={() => setIsUserDropdownOpen(prev => !prev)}
          >
            <span className="sr-only">Open user menu</span>
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full">
              <img className="w-full h-full object-cover rounded-full" src={user.photoURL} alt="user" />
            </div>
          </button>
          }
          
          <AnimatePresence>
            {user && isUserDropdownOpen && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-16 right-4 z-50 w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
              >
                {/* User Info */}
                <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                  {/* <img
                    src={user?.photoURL}
                    alt="user"
                    className="w-12 h-12 rounded-full object-cover border border-primary"
                  /> */}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">{user?.displayName}</span>
                    <span className="text-xs text-gray-500 truncate">{user?.email}</span>
                  </div>
                </div>

                {/* Navigation Links */}
                <ul className="flex flex-col text-sm text-gray-700">
                  <Link
                    to="/user/dashboard"
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors duration-150"
                  >
                    Dashboard
                  </Link>
                  {/* <Link to="/user/setting" className="px-4 py-3 hover:bg-gray-100">Settings</Link> */}

                  <li
                    onClick={handleLogOut}
                    className="flex items-center gap-2 px-4 py-3 text-red-600 cursor-pointer hover:bg-red-50 transition-colors duration-150"
                  >
                    <TbLogout className="text-lg" /> Sign out
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>


          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        <>
  {/* 👇 For Mobile - AnimatePresence for animated toggle */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                key="mobile-nav"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-full left-0 w-full z-40 bg-white shadow-md"
                id="navbar-user"
              >
                <ul className="flex flex-col font-medium p-4 border border-gray-100 rounded-lg bg-gray-50 text-sm">
                  {["/", "/shops", "/restaurants", "/viewAll", "/reviews", "/addReviews", "/about"].map(nav => (
                    <motion.div
                      className="relative group"
                      initial="rest"
                      animate="rest"
                      whileHover="hover"
                      key={nav}
                    >
                      <NavLink
                        to={nav}
                        className={navItemClasses}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {() => routeToLabel(nav) === "" ? "Home" : routeToLabel(nav)}
                      </NavLink>

                      <NavLink
                        to={nav}
                        children={({ isActive }) =>
                          !isActive && (
                            <motion.div
                              className="absolute left-0 bottom-0 h-0.5 bg-primary"
                              variants={{
                                rest: { width: 0, opacity: 0, x: -20 },
                                hover: { width: '100%', opacity: 1, x: 0 },
                              }}
                              transition={{ duration: 0.2, ease: 'easeOut' }}
                            />
                          )
                        }
                      />
                    </motion.div>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 👇 For Desktop - Always Visible */}
          <div className="hidden md:flex md:items-center md:order-1" id="navbar-user">
            <ul className="flex font-medium space-x-1 text-xs lg:text-base lg:space-x-4 xl:space-x-7">
              {["/", "/shops", "/restaurants", "/viewAll", "/reviews", "/addReviews", "/about"].map(nav => (
                <motion.div
                  className="relative group"
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  key={nav}
                >
                  <NavLink
                    to={nav}
                    className={navItemClasses}
                  >
                    {() => routeToLabel(nav) === "" ? "Home" : routeToLabel(nav)}
                  </NavLink>

                  <NavLink
                    to={nav}
                    children={({ isActive }) =>
                      !isActive && (
                        <motion.div
                          className="absolute left-0 bottom-0 h-0.5 bg-primary"
                          variants={{
                            rest: { width: 0, opacity: 0, x: -20 },
                            hover: { width: '100%', opacity: 1, x: 0 },
                          }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                        />
                      )
                    }
                  />
                </motion.div>
              ))}
            </ul>
          </div>
        </>

      </div>
    </nav>
  );
};

export default Navbar;