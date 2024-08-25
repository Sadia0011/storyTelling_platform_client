import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../useAxiosPublic";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axios=useAxiosPublic()
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Sign in with email and password
    signIn(email, password)
      .then((result) => {
        toast.success("Successfully logged in!");
        setTimeout(() => {
          navigate(location?.state?.from?.pathname || "/");
        }, 2000);
      })
      .catch((error) => {
        toast.error("Email or password doesn't match. Please try again.");
        console.error("Login Error:", error);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;

       
        const userInfo = {
          profile: {
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          email: user.email,
          password: null, 
        };

        axios.post("https://story-telling-platfrom-backend.vercel.app/user", userInfo)
          .then((response) => {
            if (response.status === 200) {
              toast.success("Successfully logged in with Google!");
              console.log("User saved to database:", response.data);
            }
          })
          .catch((error) => {
            toast.error("Failed to save user to database.");
            console.error("Database Error:", error);
          });

        setTimeout(() => {
          navigate(location?.state?.from?.pathname || "/");
        }, 2000);
      })
      .catch((error) => {
        toast.error("Failed to log in with Google. Please try again.");
        console.error("Google Sign-In Error:", error);
      });
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
          <img src="https://img.lovepik.com/element/45007/0204.png_860.png" alt="Login Illustration" className="w-2/3 h-auto" />
        </motion.div>

      
        <motion.div
          className="flex items-center justify-center bg-white shadow-lg p-8 w-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-full max-w-sm">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-purple-800">Login Now!</h1>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleLogin}>
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
                <button
                  className="btn bg-purple-500 border-none text-white w-full hover:bg-purple-800"
                >
                  Login
                </button>
              </div>
            </form>

            <div className="divider">OR</div>

            {/* Google Sign-In Button */}
            <button
              onClick={handleGoogleSignIn}
              className="btn w-full bg-white text-black border-gray-300 flex justify-center items-center gap-2 hover:bg-gray-100"
            >
              <FcGoogle className="text-2xl" /> Login with Google
            </button>

            <p className="text-center mt-6">
              New here?{" "}
              <Link to="/register" className="text-purple-800 font-semibold">
                Register
              </Link>
            </p>

            <ToastContainer />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
