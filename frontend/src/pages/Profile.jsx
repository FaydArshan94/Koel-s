import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { logoutuser, updateuserCart } from "../store/users/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { updateuser } from "../api/userApi";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [editMode, setEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState(currentUser?.image || "");
  const [showFullImg, setShowFullImg] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      image: currentUser?.image || "",
      password: currentUser?.password || "", // <-- add this line
    },
  });

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-lg">
          Please login to view your profile.
        </p>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(logoutuser());
    navigate("/login");
  };

  const onSubmit = async (data) => {
    try {
      const updatedUser = { ...currentUser, ...data };
      const response = await axios.patch(
        `/users/${currentUser.id}`,
        updatedUser
      );
      dispatch(updateuserCart(response.data));
      setEditMode(false);
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group w-32 h-32">
            <img
              src={previewImage || "https://via.placeholder.com/150"}
              alt="Profile"
              onClick={() => setShowFullImg(true)}
              className="w-full h-full rounded-full object-cover border-4 border-blue-500 cursor-pointer shadow"
            />

            {showFullImg && (
              <div
                className="fixed inset-0 bg-black/20 bg-opacity-80 z-50 flex flex-col gap-8 justify-center items-center"
                onClick={() => setShowFullImg(false)}
              >
                <div
                  className="bg-white rounded-lg shadow-2xl flex flex-col items-center p-6 gap-6"
                  onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
                >
                  <img
                    src={previewImage || "https://via.placeholder.com/150"}
                    alt="Full Profile"
                    className="max-h-[60vh] max-w-[80vw] rounded-lg object-contain"
                  />

                  {/* Upload by URL */}
                  <form
                    className="flex flex-col sm:flex-row gap-3 w-full"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const url = e.target.photoUrl.value.trim();
                      if (!url) return;
                      try {
                        const updatedUser = { ...currentUser, image: url };
                        const response = await axios.patch(
                          `/users/${currentUser.id}`,
                          updatedUser
                        );
                        dispatch(updateuserCart(response.data));
                        setPreviewImage(url);
                        setShowFullImg(false);
                      } catch (err) {
                        alert("Failed to update photo.");
                      }
                    }}
                  >
                    <input
                      type="url"
                      name="photoUrl"
                      placeholder="Paste image URL"
                      className="border rounded px-3 py-2 flex-1"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Upload Photo
                    </button>
                  </form>

                  {/* Remove Photo */}
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
                    onClick={async () => {
                      try {
                        const updatedUser = { ...currentUser, image: "" };
                        const response = await axios.patch(
                          `/users/${currentUser.id}`,
                          updatedUser
                        );
                        dispatch(updateuserCart(response.data));
                        setPreviewImage("");
                        setShowFullImg(false);
                      } catch (err) {
                        alert("Failed to remove photo.");
                      }
                    }}
                  >
                    Remove Photo
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="w-full sm:ml-6">
            {editMode ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Your Name"
                    className="w-full p-2 border rounded"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Your Email"
                    className="w-full p-2 border rounded"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 4,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    placeholder="Your Password"
                    className="w-full p-2 border rounded"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      reset(currentUser);
                    }}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  {currentUser.name}
                </h1>
                <p className="text-gray-600 mb-2">{currentUser.email}</p>
                <Link to="/cart" className="text-sm text-gray-500">
                  🛒 Cart Items: {currentUser.cart?.length || 0}
                </Link>
                <br />
                {currentUser?.isAdmin && (
                  <div className="mt-4">
                    <Link
                      to="/admin/orders"
                      className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                    >
                      🛠️ View All Orders (Admin)
                    </Link>
                  </div>
                )}

                {!currentUser?.isAdmin && (
                  <Link
                    to="/orders"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    📦 My Orders
                  </Link>
                )}

                <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <hr className="my-6 border-t" />
        <div className="text-sm text-gray-500 text-center">
          Update your profile and make it reflect your vibe 😎
        </div>
      </div>
    </div>
  );
};

export default Profile;
