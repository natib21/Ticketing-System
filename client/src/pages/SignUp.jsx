import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link ,useNavigate} from "react-router";
import useAuth from "../hook/useAuth";
const SignUp = () => {
  const { register, handleSubmit,watch, formState: { errors } } = useForm();
  const [success, setSuccess] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    console.log(data)
    setIsLoading(true)
    try {
        const response = await fetch("http://127.0.0.1:8000/api/user/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), 
        });
    
        const result = await response.json();
    
        if (response.ok) {
          setSuccess(true);
          console.log("Login Successful:", result);
          navigate('/login')
        
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
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-400 to-pink-500 px-4">
    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
      <header className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-white drop-shadow-lg">
          <span role="img" aria-label="ticket">🎟️</span> Ticket App
        </h2>
        <h1 className="text-xl font-semibold text-white drop-shadow-md">Create an Account</h1>
      </header>
  
      {success && <p className="text-green-500 text-center mb-4">Sign up successful! Please login.</p>}
  
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-white">Username</label>
          <input
            type="text"
            id="userName"
            {...register("userName", { required: "Username is required" })}
            className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 ${
              errors.userName ? "border-red-500 focus:ring-red-400" : "border-white/30 focus:ring-white/50"
            }`}
            placeholder="Enter your username"
          />
          {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
        </div>
  
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-400" : "border-white/30 focus:ring-white/50"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
  
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500 focus:ring-red-400" : "border-white/30 focus:ring-white/50"
            }`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
  
        <div>
          <label htmlFor="passwordConfirm" className="block text-sm font-medium text-white">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            {...register("passwordConfirm", {
              required: "Confirming password is required",
              validate: value => value === watch('password') || "Passwords do not match"
            })}
            className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 ${
              errors.passwordConfirm ? "border-red-500 focus:ring-red-400" : "border-white/30 focus:ring-white/50"
            }`}
            placeholder="Confirm your password"
          />
          {errors.passwordConfirm && <p className="text-red-500 text-sm mt-1">{errors.passwordConfirm.message}</p>}
        </div>
  
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-white">Role</label>
          <select
            id="role"
            {...register("role", { required: "Role is required" })}
            className={`w-full p-3 border rounded-lg bg-white/10 text-pink-900 placeholder-gray-300 focus:outline-none focus:ring-2 ${
              errors.role ? "border-red-500 focus:ring-red-400" : "border-white/30 focus:ring-white/50"
            }`}
          >
            <option value="admin">Admin</option>
            <option value="agent">Agent</option>
            <option value="customer" defaultValue>Customer</option>
          </select>
          {errors.role && <span className="text-red-500 text-sm mt-1">{errors.role.message}</span>}
        </div>
  
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white/20 text-white py-3 rounded-md hover:bg-white/30 transition duration-300 shadow-lg hover:shadow-xl backdrop-blur-md"
          >
             {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="w-5 h-5 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                </div>
              ) : (
                "Sign Up"
              )}
          </button>
        </div>
      </form>
  
      <p className="text-center mt-4 text-sm text-white">
        Already have an account? 
        <Link to="/login" className="text-white font-semibold hover:underline"> Login</Link>
      </p>
    </div>
  </section>
  );
};

export default SignUp;
