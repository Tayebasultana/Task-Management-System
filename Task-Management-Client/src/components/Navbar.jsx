import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import Theme from "./Theme";
import Drawer from "./Drawer";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme } = useContext(ThemeContext);
   const location = useLocation();

  // Check if current route is home
  const isHome = location.pathname === "/";
  const links = (
    <>
      {user ? (
        <>
          <li>
            <NavLink to="/dashboard/daily-task" className="btn ">Dashboard</NavLink>
          </li>
         
          <li>
            <button
              onClick={logOut}
              className="btn btn-sm bg-red-400 hover:bg-red-500 text-white"
            >
              Log Out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Sign Up</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className={`navbar z-20 bg-base-100 flex justify-between items-center px-2 md:px-7 lg:px-16 
      ${isHome ? "fixed" : "relative"}`}>
      <div className="flex gap-4">
        <div>
          <Link to="/" className="text-3xl font-bold text-purple-700">
          Flowra
        </Link>
        </div>
        <div className={`${isHome ? "hidden" : "block"}`}>
          {/* Drawer for mobile */}
        <Drawer/>
        </div>
      </div>
      <div className="flex items-center gap-5">
        {/* toggle theme */}
        <div>
          <Theme></Theme>
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                referrerPolicy="no-referrer"
                alt="User Avatar"
                src={
                  user
                    ? user?.photoURL
                    : "https://i.ibb.co.com/5jL18Qz/avater.webp"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
