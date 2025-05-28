import { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LuLogOut } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";
import { ThemeContext } from "../provider/ThemeProvider";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const { logOut } = useAuth();

  const signOutUser = async () => {
    try {
      await logOut();
      toast.success("Successfully logged out");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Logout failed!");
    }
  };

  return (
    <div className="lg:flex lg:h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="lg:w-64 flex flex-col justify-between shadow-lg">
        <div className="hidden lg:block lg:h-full overflow-y-auto">
        <div>
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
           </div>
          </div>

        {/* Logout Button */}
        <div className="p-4 mt-auto">
          <ul className="menu">
            <li>
              <button
                onClick={signOutUser}
                className="flex items-center gap-2 px-4 py-2 text-base font-semibold bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
              >
                Logout
                <LuLogOut size={18} />
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 h-full overflow-y-auto ${
          theme === "dark" ? "bg-[#111827] text-white" : "bg-gray-100"
        }`}
      >
        <div className="p-4 md:p-6 xl:px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
