import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./pages/Home";
// import AddTask from "./components/AddTask";
import AuthProvider from "./provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Privet from "./privet/Privet";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import Register from "./components/Register";
import Login from "./components/Login";
import ThemeProvider from "./provider/ThemeProvider";
// import LoginPage from "./components/LoginPage";
// import SignUpPAge from "./components/SignUpPAge";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      // {
      //   path: "/",
      //   element: (
      //     <Privet>
      //       <Home></Home>
      //     </Privet>
      //   ),
      // },
      // {
      //   path: "/add-task",
      //   element: (
      //     <Privet>
      //       <AddTask></AddTask>
      //     </Privet>
      //   ),
      // }
    ]
  },
  {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      }
]);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster></Toaster>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
