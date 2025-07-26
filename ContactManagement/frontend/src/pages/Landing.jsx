import React from 'react'
import image from '../../public/assets/contact-book.png'
import { Link } from 'react-router-dom';

const Landing = () => {
  const islog = localStorage.getItem('token');
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f5f5dc]">
      <img
        src={image}
        alt="Contact Book"
        className="w-24 h-24 mb-6"
      />
      <h1 className="text-4xl font-bold mb-2 text-[#8d5524]">Contact Manager</h1>
      <p className="mb-8 text-sm text-[#c68642] text-center max-w-md">
        Organize your contacts easily and securely. Add, edit, favorite, and manage all your contacts in one place.
      </p>

      <div className="flex gap-4">
        {islog ? (
          <>
            <Link
              to="/add"
              className="bg-white text-[#8d5524] px-6 py-2 rounded hover:bg-[#e0cda9] hover:text-[#c68642] transition"
            >
              Add Contact
            </Link>
            <Link
              to="/dashboard"
              className="bg-white text-[#8d5524] px-6 py-2 rounded hover:bg-[#e0cda9] hover:text-[#c68642] transition"
            >
              Show Contacts
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="bg-[#c68642] text-white px-6 py-2 rounded hover:bg-[#8d5524] transition"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-white border border-[#c68642] text-[#c68642] px-6 py-2 rounded hover:bg-[#e0cda9] transition"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Landing;
