import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import Register from "./components/Register";
import Login from "./components/Login";
import ThemeProvider from "./provider/ThemeProvider";
import Privet from "./private/Private";
import Home from "./pages/Home";
import AddTask from "./components/AddTask";
import Dashboard from "./pages/Dashboard";
import ViewAllTask from "./components/ViewAllTask";
import Goals from "./pages/Goals";
import AddGoal from "./pages/AddGoal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: (
            <Home></Home>
        ),
      },
      {
        path: "/dashboard",
        element: <Privet><Dashboard></Dashboard></Privet>,
        children: [
        {
        path: "add-task",
        element: (
          <Privet>
            <AddTask></AddTask>
          </Privet>
        ),
        },
        {
          path: "daily-task",
          element: <ViewAllTask></ViewAllTask>
        },
        {
          path: "add-goal",
          element: <AddGoal></AddGoal>
        },
        {
          path: "my-goals",
          element: <Goals></Goals>
        }
        ]
      },
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
