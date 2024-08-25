import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GrTapeOption } from "react-icons/gr";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut().then(() => {
      navigate("/");
    });
  };

  return (
    <div className="navbar bg-gradient-to-r from-purple-400 via-pink-700 to-purple-500 text-white sticky top-0 z-10 shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center px-4 lg:px-8">
    
        <div className="flex items-center flex-shrink-0">
          <button
            onClick={() => navigate("/")}
            className="btn btn-ghost text-2xl font-bold text-white flex items-center gap-2"
          >
            <GrTapeOption className="text-purple-900" />
            Story Teller
          </button>
        </div>

      
        <div className="hidden lg:flex lg:flex-1 lg:justify-center space-x-6 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-purple-900" : "text-white hover:text-purple-900"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/storyinsights"
            className={({ isActive }) =>
              isActive ? "text-purple-900" : "text-white hover:text-purple-900"
            }
          >
            Story Insights
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-purple-400" : "text-white hover:text-purple-900"
            }
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-purple-900" : "text-white hover:text-purple-900"
            }
          >
            About
          </NavLink>
        </div>

   
        <div className="flex items-center space-x-4">
          {user?.email ? (
            <details className="relative hidden lg:block">
              <summary className="cursor-pointer flex items-center gap-2">
                <img
                  src={user.photoURL || "https://via.placeholder.com/150"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                {user.displayName || 'unknown'}
              </summary>
              <ul className="absolute right-0 mt-2 p-2 shadow bg-white rounded-box w-52 text-black">
                <li>
                  <NavLink
                    to="/useraddedstory"
                    className="block px-4 py-2 hover:bg-purple-200 rounded"
                  >
                    My Added Story
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn bg-purple-400 text-white w-full hover:bg-purple-600"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </details>
          ) : (
            <NavLink
              to="/login"
              className="btn bg-purple-400 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
            >
              Login
            </NavLink>
          )}

          {/* mobile tablet */}
          <div className="lg:hidden">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-black rounded-box w-52"
              >
                <li>
                  <NavLink to="/" className="hover:bg-purple-900 px-4 py-2 block rounded">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/storyinsights" className="hover:bg-purple-900 px-4 py-2 block rounded">
                  Story Insights
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="hover:bg-purple-900 px-4 py-2 block rounded">
                    Contact Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="hover:bg-purple-900 px-4 py-2 block rounded">
                    About
                  </NavLink>
                </li>
                {user?.email && (
                  <>
                    <li>
                      <NavLink to="/useraddedstory" className="hover:bg-purple-900 px-4 py-2 block rounded">
                        My Added Story
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="btn bg-purple-400 text-white w-full hover:bg-purple-600"
                      >
                        Log Out
                      </button>
                    </li>
                  </>
                )}
                {!user?.email && (
                  <li>
                    <NavLink
                      to="/login"
                      className="hover:bg-purple-900 px-4 py-2 block rounded text-purple-900"
                    >
                      Login
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
