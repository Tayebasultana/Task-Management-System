import Lottie from "lottie-react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import axios from "axios";
import register from "../../public/register.json";
import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";

const Register = () => {
  const { signUpUser, googleLogin, updateUserProfile, setUser } = useAuth();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    signUpUser(email, password)
      .then((result) => {
        updateUserProfile(name);
        setUser({ ...result.user, displayName: name, photoURL: null });
        const userInfo = {
          name,
          email: result?.user?.email,
          userId: result?.user?.uid,
        };
        axios.post(`${import.meta.env.VITE_API_URL}/user-info`, userInfo);
        navigate("/");
        toast.success("Sign up successfully");
      })
      .catch((error) => console.log(error.message));
  };

  const handleGoogleSignUp = () => {
    googleLogin()
      .then((result) => {
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          userId: result?.user?.uid,
        };
        axios.post(`${import.meta.env.VITE_API_URL}/user-info`, userInfo);
        navigate("/");
        toast.success("Signed up successfully");
      })
      .catch((error) => console.log(error.message));
  };

    return (
        <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Animation (Hidden on Small Screens) */}
      <div className="hidden md:flex md:w-1/2 bg-purple-50 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Lottie animationData={register} loop={true} />
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="max-w-sm w-full">
          <h1 className={`text-3xl font-bold text-center ${theme==="dark"? "text-gray-200" : "text-gray-900"}`}>
            Create your account
          </h1>
          <p className={`mb-6 text-center ${theme==="dark"? "text-gray-300" : "text-gray-700"}`}>
            Please enter your details
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className={`block ${theme==="dark"? "text-gray-300" : "text-gray-700"}`}>Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className={`block ${theme==="dark"? "text-gray-300" : "text-gray-700"}`}>Email address</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className={`block ${theme==="dark"? "text-gray-300" : "text-gray-700"}`}>Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-purple-600 py-3 rounded-lg hover:bg-purple-700 transition font-semibold text-black `}
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="border-b w-full"></div>
            <span className="mx-3 text-gray-400">or</span>
            <div className="border-b w-full"></div>
          </div>

          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center border py-3 rounded-lg hover:bg-gray-100 hover:text-black transition"
          >
            <FcGoogle className="mr-2 text-2xl" /> Sign up with Google
          </button>

          <p className={`mt-4 text-center ${theme==="dark"? "text-gray-300" : "text-gray-700"}`}>
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
    );
};

export default Register;