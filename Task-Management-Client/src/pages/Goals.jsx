import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import { ThemeContext } from "../provider/ThemeProvider";

const Goals = () => {
  const { user } = useAuth();
  const [type, setType] = useState("all");
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { theme } = useContext(ThemeContext);

const handleEditGoal = (goal) => {
  setEditingGoal(goal);
  setShowEditModal(true);
};

  const fetchGoals = async () => {
    if (!user?.email) return;
    setLoading(true);

    try {
      let results = [];

      if (type === "all") {
        // Fetch both weekly and monthly goals
        const [weeklyRes, monthlyRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/goals`, {
            params: { email: user.email, type: "weekly" },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/goals`, {
            params: { email: user.email, type: "monthly" },
          }),
        ]);
        results = [...weeklyRes.data, ...monthlyRes.data];
      } else {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/goals`, {
          params: { email: user.email, type },
        });
        results = res.data;
      }

      setGoals(results);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load goals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [type, user]);

  const markComplete = async (id) => {
  try {
    await axios.patch(`${import.meta.env.VITE_API_URL}/goals/${id}`);
    toast.success("Goal marked as completed");

    // 🎉 Fire confetti
    confetti({
      particleCount: 200,
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: { x: 0.5, y: 0.4 }
    });

    fetchGoals();
  } catch (error) {
    console.error(error);
    toast.error("Failed to update goal");
  }
};


const deleteGoal = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/goals/${id}`);
      toast.success("Goal deleted");
      fetchGoals();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete goal");
    }
  }
};


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">My Goals</h2>

      {/* Tabs */}
      <div className="tabs tabs-box justify-center mb-6">
        <input
          type="radio"
          name="goal_tabs"
          className="tab"
          aria-label="All Goals"
          onChange={() => setType("all")}
          checked={type === "all"}
        />
        <input
          type="radio"
          name="goal_tabs"
          className="tab"
          aria-label="Weekly Goals"
          onChange={() => setType("weekly")}
          checked={type === "weekly"}
        />
        <input
          type="radio"
          name="goal_tabs"
          className="tab"
          aria-label="Monthly Goals"
          onChange={() => setType("monthly")}
          checked={type === "monthly"}
        />
      </div>

      {!loading && goals.length === 0 && (
        <p className="text-center text-gray-500">No {type} goals found.</p>
      )}

      <ul className="space-y-6">
        {goals.map((goal) => (
          <li key={goal._id}
          className={`p-4 border rounded-lg shadow 
            ${
              goal.isCompleted
                ? theme === "dark"
                  ? "bg-green-900/50"
                  : "bg-green-200"
                : theme === "dark"
                ? "bg-gray-800"
                : "bg-white"
            }`}>
            <div className="flex justify-between items-start gap-2">
              <h3 className={`text-xl font-semibold`}>
                {goal.title}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditGoal(goal)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>

                {!goal.isCompleted && (
                  <button
                    onClick={() => markComplete(goal._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                  >
                    Mark Done
                  </button>
                )}
                <button
                  onClick={() => deleteGoal(goal._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-2"><strong>Why:</strong> {goal.why}</p>
            <p><strong>How:</strong> {goal.how}</p>
            <p><strong>Roadmap:</strong> {goal.roadmap}</p>
            {goal.deadline && (
              <p><strong>Deadline:</strong> {new Date(goal.deadline).toLocaleDateString()}</p>
            )}
            <p><strong>Priority:</strong> {goal.priority?.charAt(0).toUpperCase() + goal.priority?.slice(1)}</p>
          </li>
        ))}
      </ul>
      {/* Edit Modal */}
      {showEditModal && editingGoal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={() => setShowEditModal(false)}
      >
        ✕
      </button>

      <h3 className="text-xl font-bold mb-4">Edit Goal</h3>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const updatedGoal = {
            title: formData.get("title"),
            why: formData.get("why"),
            how: formData.get("how"),
            roadmap: formData.get("roadmap"),
            priority: formData.get("priority"),
            deadline: formData.get("deadline"),
          };

          try {
            await axios.put(
              `${import.meta.env.VITE_API_URL}/goals/${editingGoal._id}`,
              updatedGoal
            );
            toast.success("Goal updated successfully");
            setShowEditModal(false);
            fetchGoals();
          } catch (error) {
            toast.error("Failed to update goal");
            console.error(error);
          }
        }}
      >
        <div className="space-y-4">
          <input
            name="title"
            defaultValue={editingGoal.title}
            className="w-full p-2 border rounded"
            placeholder="Title"
            required
          />
          <textarea
            name="why"
            defaultValue={editingGoal.why}
            className="w-full p-2 border rounded"
            placeholder="Why"
          />
          <textarea
            name="how"
            defaultValue={editingGoal.how}
            className="w-full p-2 border rounded"
            placeholder="How"
          />
          <textarea
            name="roadmap"
            defaultValue={editingGoal.roadmap}
            className="w-full p-2 border rounded"
            placeholder="Roadmap"
          />
          <select
            name="priority"
            defaultValue={editingGoal.priority}
            className="w-full p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            name="deadline"
            defaultValue={
              editingGoal.deadline?.slice(0, 10) || ""
            }
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Update Goal
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Goals;
