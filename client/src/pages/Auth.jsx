// import React from 'react'
// import { BsRobot } from "react-icons/bs";
// import { IoSparkles } from "react-icons/io5";
// import { motion } from "motion/react"
// import { FcGoogle } from "react-icons/fc";
// import { signInWithPopup } from 'firebase/auth';
// import { auth, provider } from '../utils/firebase';
// import axios from 'axios';
// import { ServerUrl } from '../App';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';
// function Auth({isModel = false}) {
//     const dispatch = useDispatch()

//     const handleGoogleAuth = async () => {
//         try {
//             const response = await signInWithPopup(auth,provider)
//             console.log(response);
            
//             let User = response.user
//             let name = User.displayName
//             let email = User.email
//             const result = await axios.post(ServerUrl + "/api/auth/google" , {name , email} , {withCredentials:true})
//             dispatch(setUserData(result.data))
            
//         } catch (error) {
//             console.log(error)
//               dispatch(setUserData(null))
//         }


//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setError("")
//         setLoading(true)
//         try {
//             if (isLogin) {
//                 const result = await axios.post(
//                     ServerUrl + "/api/auth/login",
//                     { email: form.email, password: form.password },
//                     { withCredentials: true }
//                 )
//                 dispatch(setUserData(result.data))
//             } else {
//                 const result = await axios.post(
//                     ServerUrl + "/api/auth/register",
//                     { name: form.name, email: form.email, password: form.password },
//                     { withCredentials: true }
//                 )
//                 dispatch(setUserData(result.data.user))
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || "Something went wrong")
//         } finally {
//             setLoading(false)
//         }
//     }
//   return (
//     <div className={`
//       w-full 
//       ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}
//     `}>
//         <motion.div 
//         initial={{opacity:0 , y:-40}} 
//         animate={{opacity:1 , y:0}} 
//         transition={{duration:1.05}}
//         className={`
//         w-full 
//         ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
//         bg-white shadow-2xl border border-gray-200
//       `}>
//             <div className='flex items-center justify-center gap-3 mb-6'>
//                 <div className='bg-black text-white p-2 rounded-lg'>
//                     <BsRobot size={18}/>

//                 </div>
//                 <h2 className='font-semibold text-lg'>InterviewIQ.AI</h2>
//             </div>

//             <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
//                 Continue with
//                 <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
//                     <IoSparkles size={16}/>
//                     AI Smart Interview

//                 </span>
//             </h1>

//             <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
//                 Sign in to start AI-powered mock interviews,
//         track your progress, and unlock detailed performance insights.
//             </p>


//             <motion.button 
//             onClick={handleGoogleAuth}
//             whileHover={{opacity:0.9 , scale:1.03}}
//             whileTap={{opacity:1 , scale:0.98}}
//             className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md '>
//                 <FcGoogle size={20}/>
//                 Continue with Google

   
//             </motion.button>
//         </motion.div>

      
//     </div>
//   )
// }

// export default Auth












import React, { useState } from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Auth({ isModel = false }) {
    const dispatch = useDispatch()
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState({ name: "", email: "", password: "" })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError("")
    }

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google", { name, email }, { withCredentials: true })
            dispatch(setUserData(result.data))
        } catch (error) {
            console.log(error)
            dispatch(setUserData(null))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            if (isLogin) {
                const result = await axios.post(
                    ServerUrl + "/api/auth/login",
                    { email: form.email, password: form.password },
                    { withCredentials: true }
                )
                dispatch(setUserData(result.data))
            } else {
                const result = await axios.post(
                    ServerUrl + "/api/auth/register",
                    { name: form.name, email: form.email, password: form.password },
                    { withCredentials: true }
                )
                dispatch(setUserData(result.data.user))
                setIsLogin(true)
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`
            w-full 
            ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}
        `}>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.05 }}
                className={`
                    w-full 
                    ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
                    bg-white shadow-2xl border border-gray-200
                `}>

                <div className='flex items-center justify-center gap-3 mb-6'>
                    <div className='bg-black text-white p-2 rounded-lg'>
                        <BsRobot size={18} />
                    </div>
                    <h2 className='font-semibold text-lg'>InterviewIQ.AI</h2>
                </div>

                <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
                    {isLogin ? "Welcome Back" : "Create Account"}
                    <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2 ml-2'>
                        <IoSparkles size={16} />
                        AI Smart Interview
                    </span>
                </h1>

                <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-6'>
                    {isLogin
                        ? "Sign in to continue your AI-powered interview prep."
                        : "Sign up to start AI-powered mock interviews and track your progress."}
                </p>

                <div className='flex bg-gray-100 rounded-full p-1 mb-6'>
                    <button
                        onClick={() => { setIsLogin(true); setError("") }}
                        className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${isLogin ? "bg-black text-white shadow" : "text-gray-500"}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => { setIsLogin(false); setError("") }}
                        className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${!isLogin ? "bg-black text-white shadow" : "text-gray-500"}`}
                    >
                        Register
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-3 mb-4'>
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className='w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-black transition'
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-black transition'
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.value}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-black transition'
                    />
                    {error && (
                        <p className='text-red-500 text-sm text-center'>{error}</p>
                    )}

                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ opacity: 0.9, scale: 1.03 }}
                        whileTap={{ opacity: 1, scale: 0.98 }}
                        className='w-full py-3 bg-black text-white rounded-full shadow-md text-sm font-medium disabled:opacity-60'
                    >
                        {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
                    </motion.button>
                </form>

                <div className='flex items-center gap-3 mb-4'>
                    <div className='flex-1 h-px bg-gray-200' />
                    <span className='text-xs text-gray-400'>or</span>
                    <div className='flex-1 h-px bg-gray-200' />
                </div>

                <motion.button
                    onClick={handleGoogleAuth}
                    whileHover={{ opacity: 0.9, scale: 1.03 }}
                    whileTap={{ opacity: 1, scale: 0.98 }}
                    className='w-full flex items-center justify-center gap-3 py-3 bg-white border border-gray-200 text-black rounded-full shadow-sm text-sm font-medium'
                >
                    <FcGoogle size={20} />
                    Continue with Google
                </motion.button>

            </motion.div>
        </div>
    )
}

export default Auth