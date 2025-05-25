import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={'https://i.ibb.co/tp2thjR1/tr-ffl.png'} className="h-8" alt="Logo" />
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">Flowbite</span> */}
        </a>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className='md:space-x-2'>
            <button className='btn btn-sm lg:btn-md border-0 bg-primary text-white rounded-lg'>Login</button>
            <button className='hidden md:inline-block btn lg:btn-md btn-sm border-2 border-primary text-primary rounded-lg'>Sign Up</button>
          </div>
          {/* <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user" />
          </button> */}

          {isUserDropdownOpen && (
            <div className="absolute top-14 right-4 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900">Bonnie Green</span>
                <span className="block text-sm text-gray-500 truncate">name@flowbite.com</span>
              </div>
              <ul className="py-2">
                <li><a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Dashboard</a></li>
                <li><a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Settings</a></li>
                <li><a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Earnings</a></li>
                <li><a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Sign out</a></li>
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
              className="block py-2 px-3 rounded md:border-b-3 md:border-b-transparent md:hover:text-primary md:hover:border-b-primary md:py-0.5 md:px-1 transition-all duration-150 ease-in-out">
              Home
            </NavLink>
            <NavLink to="/shops"
              className="block py-2 px-3 rounded md:border-b-3 md:border-b-transparent md:hover:text-primary md:hover:border-b-primary md:py-0.5  md:px-1 transition-all duration-150 ease-in-out">
              Shops
            </NavLink>
            <NavLink to="/reviews"
              className="block py-2 px-3 rounded md:border-b-3 md:border-b-transparent md:hover:text-primary md:hover:border-b-primary md:py-0.5  md:px-1 transition-all duration-150 ease-in-out">
              Reviews
            </NavLink>
            <NavLink to="/shopWishlist"
              className="block py-2 px-3 rounded md:border-b-3 md:border-b-transparent md:hover:text-primary md:hover:border-b-primary md:py-0.5 md:px-1 transition-all duration-150 ease-in-out">
              Shop Wishlist
            </NavLink>
            <NavLink to="/contact"
              className="block py-2 px-3 rounded md:border-b-3 md:border-b-transparent md:hover:text-primary md:hover:border-b-primary md:py-0.5  md:px-1 transition-all duration-150 ease-in-out">
              Contact
            </NavLink>


          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
