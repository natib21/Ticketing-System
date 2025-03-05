import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link ,useNavigate} from "react-router";
import { useAuth as auth} from "../context/AuthContext";
import useAuth from "../hook/useAuth";
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const {loginAuth} = useAuth()
  const {login,isAuthenticated ,user} = auth()
  const [isLoading,setIsLoading] = useState(false)
  const onSubmit = async(data) => {
    setIsLoading(true)
    try {
        const response = await fetch("http://127.0.0.1:8000/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), 
        });
    
        const result = await response.json();
    
        if (response.ok) {
          console.log("Login Successful:", result);
          loginAuth(result.user,result.token)
          login(result.user,result.token);
          navigate("/");
        
        } else {
          console.error("Login Failed:", result.message);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }finally{
        setIsLoading(false)
      }
    };
 
  return (
    <section className=" flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-400 to-pink-500">
    <div className="m-2 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-md w-full border border-white/20">
      <header className="text-center mb-6">
        <h2 className="text-4xl font-bold text-white drop-shadow-lg">
          🎟️ Ticket App
        </h2>
        <h1 className="text-lg font-medium text-gray-200">Welcome Back</h1>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
    
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-400" : "border-white/30 focus:ring-white/50"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

 
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500 focus:ring-red-400" : "border-white/30 focus:ring-white/50"
            }`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
        </div>

       
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white/20 text-white py-3 rounded-lg hover:bg-white/30 transition-all duration-300 font-semibold shadow-lg"
          >
            {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="w-5 h-5 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                </div>
              ) : (
                "Login"
              )}
          </button>
        </div>
      </form>

   
      <p className="text-center mt-4 text-sm text-gray-200">
        Don't have an account? 
        <Link to="/signup" className="text-white font-semibold hover:underline ml-1">
          Sign Up
        </Link>
      </p>
    </div>
  </section>
  );
};

export default Login;
