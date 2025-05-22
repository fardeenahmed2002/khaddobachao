import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Appcontent } from "../contextapi/Appcontext";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    role: "user"
  });
  const [imgs, setImgs] = useState(null);
  const profileimg = (e) => setImgs(e.target.files[0]);

  const { setIsloggedin, getuserdata } = useContext(Appcontent);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.address || !formData.phone) {
      setError("All fields are required!");
      return;
    }
    try {
      setError("");
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => form.append(key, value));
      form.append("avatar", imgs);

      axios.defaults.withCredentials = true;
      const { data } = await axios.post("http://localhost:3000/api/auth/register", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (data.success) {
        setIsloggedin(true);
        await getuserdata();
        toast.success("Registration successful! Please wait");
        setTimeout(() => navigate('/'), 4000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen p-6 shadow-2xl bg-[#fff7e6] relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 bg-[url('/background-veggie-pattern.png')] bg-repeat pointer-events-none hidden md:block" />

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-[650px] flex flex-col md:flex-row z-10">
        <div className="w-[650px] p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Create an Account</h2> <br />
          <div className='flex flex-col justify-center items-center'>
            <label className="block text-gray-600 font-semibold">Register as</label>
            <div className="flex space-x-4">
              <input type="radio" name="role" defaultChecked />
              <p>user</p>
              <input type="radio" name="role" onClick={() => navigate('/donorsignup')} />
              <p>donor</p>
              <input type="radio" name="role" onClick={() => navigate('/ngosignup')} />
              <p>collector</p>
            </div>
          </div> <br />

          {error && (
            <motion.p className="text-red-500 text-center mt-2" animate={{ x: [0, -10, 10, 0] }}>
              {error}
            </motion.p>
          )}

          <motion.form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-600 font-semibold">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" autoComplete="off" />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-600 font-semibold">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" autoComplete="off" />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-600 font-semibold">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" autoComplete="off" />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-600 font-semibold">Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" autoComplete="off" />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 font-semibold">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" autoComplete="off" />
            </div>
            <br />
            <div>
              <input type="file" name="avatar" onChange={profileimg} />
            </div> <br />
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">Sign Up</button>
            <p className="text-center">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
          </motion.form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} />
    </motion.div>
  );
}
