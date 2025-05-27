import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { TbLogout } from 'react-icons/tb';

const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logOutUser } = useContext(AuthContext);

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

  return (
    <nav className="bg-white border-gray-200 font-poppins">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={'https://i.ibb.co/tp2thjR1/tr-ffl.png'} className="h-8" alt="Logo" />
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
          
          { user && isUserDropdownOpen && (
            <div 
            ref={dropdownRef}
            className="absolute top-14 right-12 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900">{user?.displayName}</span>
                <span className="block text-sm text-gray-500 truncate">{user?.email}</span>
              </div>
              <ul className="py-2">
                <li className="cursor-pointer block px-4 py-2 text-sm hover:bg-gray-100">Dashboard</li>
                <li className="cursor-pointer block px-4 py-2 text-sm hover:bg-gray-100">Settings</li>
                <li className="cursor-pointer block px-4 py-2 text-sm hover:bg-gray-100">Earnings</li>
                <li 
                onClick={handleLogOut}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">Sign out <TbLogout /></li>
              </ul>
            </div>
          )}

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

        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? '' : 'hidden'}`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-3 text-sm lg:text-base lg:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            
            <NavLink to="/"
              className="block py-2 px-3 rounded md:border-b-3 md:border-b-transparent md:hover:text-primary md:hover:border-b-primary md:py-0.5 md:px-0.5 transition-all duration-150 ease-in-out">
              Home
            </NavLink>
            <NavLink to="/shops"
              className="block py-2 px-3 rounded md:border-b-3 md:border-b-transparent md:hover:text-primary md:hover:border-b-primary md:py-0.5 md:px-0.5 transition-all duration-150 ease-in-out">
              Shops
            </NavLink>
            <NavLink to="/reviews"
              className="block py-2 px-3 rounded md:border-b-3 md:border-b-transparent md:hover:text-primary md:hover:border-b-primary md:py-0.5 md:px-0.5 transition-all duration-150 ease-in-out">
              Reviews
            </NavLink>
            <NavLink to="/addReviews"
              className="block py-2 px-3 rounded md:border-b-3 md:border-b-transparent md:hover:text-primary md:hover:border-b-primary md:py-0.5 md:px-0.5 transition-all duration-150 ease-in-out">
              Add Review
            </NavLink>
            <NavLink to="/shopWishlist"
              className="block py-2 px-3 rounded md:border-b-3 md:border-b-transparent md:hover:text-primary md:hover:border-b-primary md:py-0.5 md:px-1 transition-all duration-150 ease-in-out">
              Shop Wishlist
            </NavLink>
            <NavLink to="/contact"
              className="block py-2 px-3 rounded md:border-b-3 md:border-b-transparent md:hover:text-primary md:hover:border-b-primary md:py-0.5 md:px-0.5 transition-all duration-150 ease-in-out">
              Contact
            </NavLink>


          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
