import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
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
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <input 
            {...register("email", {
                required: "Email is required"
            })}
            placeholder='Email'
            type="email" 
            id='email'
            />

            <label htmlFor="password">Password</label>
            <input 
            {...register("password", {
                required: "Password is required"
            })}
            placeholder='Password'
            type="password" 
            id='password'
            />

            <button>Login</button>
        </form>
    </div>
  )
}

export default LoginForm