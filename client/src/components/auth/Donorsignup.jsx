import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Appcontent } from "../contextapi/Appcontext";

export default function Donorsignup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        role: "donor",
        roletype: ""
    });

    const { setIsloggedin, getuserdata } = useContext(Appcontent)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!formData.name || !formData.email || !formData.password || !formData.address || !formData.phone || !formData.role || !formData.roletype) {
                setError("All fields are required!");
                return;
            }

            setError("");
            axios.defaults.withCredentials = true;
            const { data } = await axios.post('http://localhost:3000/api/auth/register', {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                phone: formData.phone,
                role: formData.role,
                roletype: formData.roletype,
                address: formData.address
            });

            if (data.success) {
                setIsloggedin(true);
                await getuserdata();
                navigate('/');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex justify-center items-center min-h-screen bg-[#fff7e6] p-6"
        >
            <div className="absolute inset-0 bg-[url('/background-veggie-pattern.png')] bg-repeat opacity-20 z-0 pointer-events-none hidden md:block" />

            <div className="relative z-10 bg-white shadow-lg rounded-2xl overflow-hidden w-[650px] flex flex-col md:flex-row">
                <div className="w-full p-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Create an Account</h2>
                    <br />
                    <div className="flex flex-col justify-center items-center">
                        <label className="block text-gray-600 font-bold">Register as</label>
                        <div className="flex space-x-4">
                            <input type="radio" name="role" onClick={() => navigate('/signup')} />
                            <p>user</p>
                            <input type="radio" name="role" defaultChecked />
                            <p>donor</p>
                            <input type="radio" name="role" onClick={() => navigate('/ngosignup')} />
                            <p>collector</p>
                        </div>
                    </div>
                    <br />
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
                        <div>
                            <label className="block text-gray-600 font-semibold">Full Name or Business name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your full name or Your Business name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-semibold">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your email address"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-semibold">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Your password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-semibold">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Your contact number"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-semibold">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Street, City, State, Zip Code"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-semibold">Type of Donor</label>
                            <input
                                type="text"
                                name="roletype"
                                value={formData.roletype}
                                onChange={handleChange}
                                placeholder="Restaurant, Hotel, Household, etc"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                            Sign Up
                        </button>
                        <p className="text-center">
                            Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
                        </p>
                    </motion.form>
                </div>
            </div>
        </motion.div>
    );
}
