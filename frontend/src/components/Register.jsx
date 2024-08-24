import { faLock, faEnvelope, faUser, faFont } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Register({ setLogin }) {
    const [fields, setFields] = useState({
        name: "",
        email: "",
        password: "",
        avatar: null
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let valid = true;
        const newErrors = [];

        if (!fields.name) {
            newErrors.push("Name is required");
            valid = false;
        }

        if (!fields.email) {
            newErrors.push("Email is required");
            valid = false;
        } else if (!validateEmail(fields.email)) {
            newErrors.push("Email is not valid");
            valid = false;
        }

        if (!fields.password) {
            newErrors.push("Password is required");
            valid = false;
        }

        if (valid) {
            setLoading(true);

            try {
                const formData = new FormData();
                formData.append('name', fields.name);
                formData.append('email', fields.email);
                formData.append('password', fields.password);
                if (fields.avatar) {
                    formData.append('avatar', fields.avatar);
                }

                const res = await axios.post('https://chat-application-fmoj.onrender.com/api/user/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log(res);
                const token = res.data.token;
                localStorage.setItem('token', token);
                toast.success("Registered Successfully");
                navigate('/chat');
            } catch (error) {
                console.log(error);
                toast.error("Registration failed. Please try again.");
            } finally {
                setLoading(false); 
            }
        } else {
            newErrors.forEach(error => {
                toast.error(error);
            });
        }
    }

    return (
        <div className='bg-white px-[3rem] py-[2rem] rounded-lg md:w-full md:rounded-none md:rounded-t-[4rem]'>
            <h1 className='text-[2rem] font-semibold flex justify-center items-center pb-[0.5rem]'>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className='relative border-b-[2px] border-b-black my-[1.7rem]'>
                    <span className='absolute right-[3px] top-[50%] translate-y-[-50%]'>
                        <FontAwesomeIcon icon={faFont} />
                    </span>
                    <input 
                        type="text" 
                        className={`w-full h-[50px] outline-none border-none bg-transparent peer pl-[5px] pr-[30px]`}
                        value={fields.name}
                        onChange={(e) => setFields({ ...fields, name: e.target.value })}
                    />
                    <label className={`absolute translate-y-[-50%] left-[3px] peer-focus:top-[-5px] ${fields.name.trim() !== "" ? 'top-[-5px]' : 'top-[50%]'} transition-all duration-200 ease-linear`}>Name</label>
                </div>

                <div className='relative border-b-[2px] border-b-black my-[1.7rem]'>
                    <span className='absolute right-[3px] top-[50%] translate-y-[-50%]'>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input 
                        type="text" 
                        className={`w-full h-[50px] outline-none border-none bg-transparent peer pl-[5px] pr-[30px]`}
                        value={fields.email}
                        onChange={(e) => setFields({ ...fields, email: e.target.value })}
                    />
                    <label className={`absolute translate-y-[-50%] left-[3px] peer-focus:top-[-5px] ${fields.email.trim() !== "" ? 'top-[-5px]' : 'top-[50%]'} transition-all duration-200 ease-linear`}>Email</label>
                </div>

                <div className='relative border-b-[2px] border-b-black my-[1.7rem]'>
                    <span className='absolute right-[3px] top-[50%] translate-y-[-50%]'>
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input 
                        type="password" 
                        className='w-full h-[50px] outline-none border-none bg-transparent peer pl-[5px] pr-[30px]'
                        value={fields.password}
                        onChange={(e) => setFields({ ...fields, password: e.target.value })}
                    />
                    <label className={`absolute translate-y-[-50%] left-[3px] peer-focus:top-[-5px] ${fields.password !== "" ? 'top-[-5px]' : 'top-[50%]'} transition-all duration-200 ease-linear`}>Password</label>
                </div>

                <div className='relative border-b-[2px] border-b-black my-[1.7rem]'>
                    <span className='absolute right-[3px] top-[50%] translate-y-[-50%]'>
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input 
                        type="file" 
                        className='cursor-pointer'
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setFields({ ...fields, avatar: file });
                            }
                        }}
                    />
                </div>

                <button className='bg-[#73D4E5] w-full py-[0.7rem] font-bold rounded-lg mb-[1.7rem]' disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            <p>
                Already have an account? 
                <span 
                    className='font-bold text-[#0BA7BD] cursor-pointer'
                    onClick={() => setLogin(true)}
                >
                    Login
                </span>
            </p>
        </div>
    )
}

export default Register;
