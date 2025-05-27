import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import Theme from "./Theme";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme } = useContext(ThemeContext);
  const links = (
    <>
      {user ? (
        <>
          <li>
            <NavLink to="/add-task">Add Task</NavLink>
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
    <div className="navbar bg-base-100 flex justify-between items-center">
      <div className="flex">
        <Link to="/" className="text-3xl font-bold text-purple-700">
          Flowra
        </Link>
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
                alt="Tailwind CSS Navbar component"
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
