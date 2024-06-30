import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

function LoginForm() {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const onSubmit = async(data) => {
        try {
            const res = await axios.post('http://localhost:3000/api/user/login', data);
            toast.success(res.data.message);
            const token = res.data.token;
            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

  return (
    <div className='w-96 bg-darkGrey rounded-lg text-white pl-9 pr-9 pt-6 pb-6'>
        <h1 className='text-3xl mb-4 p-3 flex justify-center items-center font-semibold font-sans'>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-1 mb-4'>
                <label htmlFor="email">Email</label>
                <input 
                {...register("email", {
                    required: "Email is required"
                })}
                placeholder='Email'
                type="email" 
                id='email'
                className='bg-darkGrey outline-none'
                />
            </div>

            <div className='flex flex-col gap-1 mb-4'>
                <label htmlFor="password">Password</label>
                <input 
                {...register("password", {
                    required: "Password is required"
                })}
                placeholder='Password'
                type="password" 
                id='password'
                className='bg-darkGrey outline-none'
                />
            </div>

            <p className='mb-4'>
                Don't have an account? <Link to='/register' className='text-lightPurple'>Register</Link>
            </p>

            <button className='text-darkGrey font-semibold bg-white block w-full p-2 rounded-md mb-4'>
                Login
            </button>
        </form>
    </div>
  )
}

export default LoginForm