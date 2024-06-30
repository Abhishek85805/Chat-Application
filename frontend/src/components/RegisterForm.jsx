import React from 'react'
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';

function RegisterForm() {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post('http://localhost:3000/api/user/register', data);
            toast.success(res.data.message);
            navigate('/login');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

  return (
    <div className='w-96 bg-darkGrey rounded-lg text-white pl-9 pr-9 pt-6 pb-6'>
        <h1 className='text-3xl mb-4 p-3 flex justify-center items-center font-semibold font-sans'>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-1 mb-4'>
                <label htmlFor="username">Username: </label>
                <input 
                {...register("username", {
                    required: "Username is required"
                })}
                id='username'
                type='text'
                placeholder='Enter Your Username'
                className='bg-darkGrey outline-none'
                />
            </div>
            
            <div className='flex flex-col gap-1 mb-4'>
                <label htmlFor="email">Email: </label>
                <input 
                {...register("email", {
                    required: "Email is required"
                })}
                id='email'
                type='email'
                placeholder='Enter Your Email'
                className='bg-darkGrey outline-none'
                />
            </div>
            
            <div className='flex flex-col gap-1 mb-4'>
                <label htmlFor="password">Password: </label>
                <input 
                {...register("password", {
                    required: "Password is required"
                })}
                id='password'
                type="password" 
                placeholder='Enter Your Password'
                className='bg-darkGrey outline-none'
                />
            </div>
            
            <p className='mb-4'>
                Already have an account? <Link to='/login' className='text-lightPurple'>Login</Link> 
            </p>
            <button className='text-darkGrey font-semibold bg-white block w-full p-2 rounded-md mb-4'>
                Register
            </button>
        </form>
    </div>
  )
}

export default RegisterForm