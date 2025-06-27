import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginuser } from "../store/users/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.get(
        `/users?email=${data.email}&password=${data.password}`
      );
      if (res.data.length > 0) {
        dispatch(loginuser(res.data[0]));
        alert("Login successful!");
        navigate("/"); // ✅ go to homepage or dashboard
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  // JSX for email, password, and login button same like signup

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4"></div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4 text-sm">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer">Sign op</span>
        </p>
      </div>
    </div>
  );
};
export default Login;