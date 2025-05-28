import { useContext, useState } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center px-6 py-12 md:px-16 transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-purple-50 text-gray-900"
      }`}
    >
      {/* Background Shape Animation */}
      <div className="absolute top-7 left-0 z-10 w-full h-full overflow-hidden">
        <svg
          className="absolute opacity-20 animate-spin-slow
          top-[0px] left-[-50px] w-[200px] 
          md:top-[-20px] md:left-[-70px] md:w-[350px]
          lg:top-[-100px] lg:left-[-100px] lg:w-[500px]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#c084fc"
            d="M42.3,-72.3C56.2,-63.5,69.7,-56.1,76.1,-44.4C82.4,-32.7,81.7,-16.3,80.5,-0.4C79.2,15.6,77.3,31.2,68.7,41.9C60.2,52.6,44.9,58.5,30.9,65.3C16.9,72.1,4.2,79.9,-9.2,83.2C-22.6,86.5,-36.7,85.2,-50.3,78.3C-63.9,71.4,-77,58.8,-82.7,44.1C-88.3,29.4,-86.4,12.7,-83.7,-2.9C-81,-18.5,-77.5,-32.9,-70.3,-46.6C-63.1,-60.2,-52.2,-73.1,-38.2,-80.8C-24.3,-88.4,-12.2,-91,0.9,-92.5C14.1,-93.9,28.2,-94.2,42.3,-72.3Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl mt-7 md:mt-0 md:text-5xl font-bold leading-tight">
          Welcome to <span className={`${theme==="dark"? "text-purple-600": "text-purple-700"}`}>Flowra</span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Flowra is a powerful and elegant task management system designed to help
          individuals and teams plan, track, and accomplish their goals — from daily
          tasks to monthly missions.
        </p>
        <p className={`text-base italic ${theme==="dark"? "text-purple-300": "text-purple-700"}`}>
          "Flowra" means "to flow" with your tasks, just like a flower blooming with purpose.
        </p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/dashboard/add-task")}
            aria-label="Get Started with Flowra"
            className="px-6 py-3 z-20 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-200"
          >
            Get Started
          </button>
          <button
            onClick={() => setShowModal(true)}
            aria-label="Learn more about Flowra"
            className={`px-6 py-3 z-20 border 
              ${theme==="dark"? "border-purple-600 text-purple-600 hover:bg-purple-100" 
              : "hover:bg-purple-900 text-purple-700 border-purple-700"} 
              rounded-lg font-semibold`}
          >
            Learn More
          </button>
        </div>
      </div>
      <Modal showModal={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Home;
