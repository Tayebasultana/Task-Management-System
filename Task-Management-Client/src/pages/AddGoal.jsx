import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonLoading from "../components/ButtonLoading";

const AddGoal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    why: "",
    how: "",
    roadmap: "",
    deadline: "",
    priority: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, type, why, how, roadmap, priority } = formData;

    if (!title || !type || !why || !how || !roadmap || !priority) {
      return toast.error("Please fill all required fields");
    }

    setLoading(true);
    try {
      const goal = {
        ...formData,
        email: user.email,
        isCompleted: false,
        createdAt: new Date(),
      };

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/goals`, goal);

      if (data.insertedId) {
        toast.success("Goal added successfully");
        navigate("/dashboard/my-goals");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add goal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-center text-3xl font-bold text-purple-700 mb-4">Add Goal</h2>
      <div className="flex justify-center">
        <div className="card bg-base-100 w-full max-w-lg border border-purple-600 p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Title */}
  <div className="form-control">
    <label className="label">
      <span className="label-text font-semibold text-purple-700">Title *</span>
    </label>
    <input
      type="text"
      name="title"
      maxLength={50}
      placeholder="Goal title"
      className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      value={formData.title}
      onChange={handleChange}
      required
    />
  </div>

  {/* Deadline */}
  <div className="form-control">
    <label className="label">
      <span className="label-text font-medium text-purple-700">Deadline (optional)</span>
    </label>
    <input
      type="date"
      name="deadline"
      className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      value={formData.deadline}
      onChange={handleChange}
    />
  </div>

  {/* Type */}
  <div className="form-control h-full">
    <label className="label">
      <span className="label-text font-semibold text-purple-700">Goal Type *</span>
    </label>
    <select
      name="type"
      value={formData.type}
      onChange={handleChange}
      className="select select-bordered w-full border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      required
    >
      <option value="" disabled>
        Select goal type
      </option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </select>
  </div>

  {/* Priority */}
  <div className="form-control">
    <label className="label">
      <span className="label-text font-semibold text-purple-700">Priority *</span>
    </label>
    <select
      name="priority"
      value={formData.priority}
      onChange={handleChange}
      className="select select-bordered w-full border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      required
    >
      <option value="" disabled>
        Select priority
      </option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </div>

  {/* Why (textarea spanning full width) */}
  <div className="form-control md:col-span-2">
    <label className="label">
      <span className="label-text font-semibold text-purple-700">Why this goal? *</span>
    </label>
    <textarea
      name="why"
      rows={3}
      placeholder="Why this goal is important"
      className="textarea textarea-bordered w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      value={formData.why}
      onChange={handleChange}
      required
    ></textarea>
  </div>

  {/* How (textarea full width) */}
  <div className="form-control md:col-span-2">
    <label className="label">
      <span className="label-text font-semibold text-purple-700">How will you complete it? *</span>
    </label>
    <textarea
      name="how"
      rows={3}
      placeholder="How you plan to complete this goal"
      className="textarea textarea-bordered w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      value={formData.how}
      onChange={handleChange}
      required
    ></textarea>
  </div>

  {/* Roadmap (textarea full width) */}
  <div className="form-control md:col-span-2">
    <label className="label">
      <span className="label-text font-semibold text-purple-700">Roadmap / Steps *</span>
    </label>
    <textarea
      name="roadmap"
      rows={3}
      placeholder="Roadmap or steps to follow"
      className="textarea textarea-bordered w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      value={formData.roadmap}
      onChange={handleChange}
      required
    ></textarea>
  </div>

  {/* Submit button full width */}
  <div className="form-control md:col-span-2 mt-6">
    {loading ? (
      <ButtonLoading width="w-full" />
    ) : (
      <button className="btn bg-purple-600 hover:bg-purple-700 text-white font-semibold w-full">
        Add Goal
      </button>
    )}
  </div>
</form>

        </div>
      </div>
    </>
  );
};

export default AddGoal;
