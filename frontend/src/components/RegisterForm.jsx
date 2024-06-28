import React from 'react'
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

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
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username: </label>
            <input 
            {...register("username", {
                required: "Username is required"
            })}
            id='username'
            type='text'
            placeholder='username'
            />

            <label htmlFor="email">Email: </label>
            <input 
            {...register("email", {
                required: "Email is required"
            })}
            id='email'
            type='email'
            placeholder='Email'
            />

            <label htmlFor="password">Password: </label>
            <input 
            {...register("password", {
                required: "Password is required"
            })}
            id='password'
            type="password" 
            placeholder='Password'
            />

            <button>Register</button>
        </form>
    </div>
  )
}

export default RegisterForm