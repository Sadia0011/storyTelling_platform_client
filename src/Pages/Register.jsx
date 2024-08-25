import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../useAxiosPublic";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const axios=useAxiosPublic()
  const handleRegister = async (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const photoURL = e.target.img.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const profile = {
      displayName: displayName,
      photoURL: photoURL,
    };

    // Password validation
    if (password.length < 6) {
      return toast("Password should be at least 6 characters long.");
    } else if (!/(?=.*[A-Z])/.test(password)) {
      return toast("Include at least one uppercase letter.");
    } else if (!/(?=.*[!@#$%^&*()_+{}|:<>?])/.test(password)) {
      return toast("Include at least one special character.");
    }

    try {
      const result = await createUser(profile, email, password);
      console.log(result);

      const response = await axios.post("https://story-telling-platfrom-backend.vercel.app/user", {
        profile,
        email,
        password,
      });

      if (response.status === 200) {
        toast("Congratulations, registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        throw new Error("Failed to post user information to MongoDB");
      }
    } catch (error) {
      console.error("Error during registration", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-screen-lg">
       
        <motion.div
          className="hidden lg:flex items-center justify-center bg-purple-300"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="https://img.lovepik.com/element/45006/9997.png_860.png"
            alt="Register Illustration"
            className="w-2/3 h-auto"
          />
        </motion.div>

    
        <motion.div
          className="flex items-center justify-center bg-white shadow-lg p-8 w-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-full max-w-sm">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-purple-800">Register Now!</h1>
            </div>

            <form onSubmit={handleRegister}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  type="text"
                  name="img"
                  placeholder="Image URL"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control mb-4 relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  required
                />
                <span
                  className="absolute right-3 top-10 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEye className="text-xl" />
                  ) : (
                    <AiOutlineEyeInvisible className="text-xl" />
                  )}
                </span>
              </div>

              <div className="form-control mt-6">
                <button className="btn bg-purple-500 text-white w-full hover:bg-purple-800">
                  Register
                </button>
              </div>
            </form>

            <p className="text-center mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-800 font-semibold">
                Login
              </Link>
            </p>

            <ToastContainer />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
