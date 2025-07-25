import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="bg-[#8d5524] text-[#f5f5dc] px-6 py-3 flex justify-between items-center shadow">
      <div>
        <Link to="/" className="font-bold text-xl hover:text-[#c68642]">
          Contact Manager
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-[#c68642]">Home</Link>
        {isLoggedIn && (
          <>
            <Link to="/dashboard" className="hover:text-[#c68642]">Dashboard</Link>
            <Link to="/profile" className="hover:text-[#c68642]">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-white text-[#8d5524] px-3 py-1 rounded hover:bg-[#e0cda9] transition"
            >
              Logout
            </button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/login" className="hover:text-[#c68642]">Login</Link>
            <Link to="/signup" className="hover:text-[#c68642]">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}