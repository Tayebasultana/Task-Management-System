import React, { useContext } from "react";
import { LuLogOut } from "react-icons/lu";
import { TiThMenu } from "react-icons/ti";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ThemeContext } from "../provider/ThemeProvider";
import useAuth from "../hooks/useAuth";

const Drawer = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const signOutUser = async () => {
    try {
      await logOut();
      toast.success("Successfully logged out");
      navigate("/login"); 
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Logout failed!");
    }
  };

  return (
    <div className="drawer z-50 block lg:hidden">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Responsive Drawer Toggle Button */}
        <label
          htmlFor="my-drawer"
          className="btn btn-primary bg-purple-700 hover:bg-purple-900 font-semibold text-white text-xs border-none"
        >
          <TiThMenu />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul
          className={`menu ${theme === "dark" ? "bg-gray-900 text-white" : "bg-base-200 text-base-content"} h-full w-72 p-4 flex flex-col`}
        >
          <div className="mb-6 text-center">
            <Link to="/" className={`text-2xl ml-4 font-bold flex items-center gap-2 ${theme === "dark" ? "text-purple-700" : "text-purple-700"}`}>
              Flowra
            </Link>
          </div>

           <ul className="menu font-semibold text-base text-base-content">
               <li className="py-3">
                 <NavLink
                   to="/dashboard/add-task"
                   className={({ isActive }) =>
                     isActive ? "text-purple-700 border-l-4 border-purple-700" : ""
                   }
                   style={{ color: "", backgroundColor: "transparent" }}
                 >
                   {/* <IoSettingsSharp className="text-xl ml-2" />{" "} */}
                   Add Task
                 </NavLink>
               </li>
               <li className="py-3">
                 <NavLink
                   to="/dashboard/daily-task"
                   className={({ isActive }) =>
                     isActive ? "text-purple-700 border-l-4 border-purple-700" : ""
                   }
                   style={{ color: "", backgroundColor: "transparent" }}
                 >
                   {/* <IoSettingsSharp className="text-xl ml-2" />{" "} */}
                   Daily Task
                 </NavLink>
               </li>
               <li className="py-3">
                 <NavLink
                   to="/dashboard/add-goal"
                   className={({ isActive }) =>
                     isActive ? "text-purple-700 border-l-4 border-purple-700" : ""
                   }
                   style={{ color: "", backgroundColor: "transparent" }}
                 >
                   {/* <IoSettingsSharp className="text-xl ml-2" />{" "} */}
                   Add Goal
                 </NavLink>
               </li>
               <li className="py-3">
                 <NavLink
                   to="/dashboard/my-goals"
                   className={({ isActive }) =>
                     isActive ? "text-purple-700 border-l-4 border-purple-700" : ""
                   }
                   style={{ color: "", backgroundColor: "transparent" }}
                 >
                   {/* <IoSettingsSharp className="text-xl ml-2" />{" "} */}
                   My Goal
                 </NavLink>
               </li>
             </ul>

          {/* Logout Button at bottom */}
          <li className="mt-auto">
            <button
              onClick={signOutUser}
              className="flex items-center gap-2 p-2 text-base font-semibold text-red-600 hover:bg-red-100 rounded"
            >
              Logout <LuLogOut size={18} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
