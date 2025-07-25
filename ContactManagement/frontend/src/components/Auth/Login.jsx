import { useState } from "react";
import axios from '../../api/axios';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({email:'', password:''});

    const [error, setError] =useState('');

    const navigate = useNavigate();

    const handleSubmit=async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res= await axios.post('/auth/login', form);

            localStorage.setItem('token', res.data.token);

            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data.msg || 'Login Failed');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-[#f5f5dc]">
            <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
                <h2 className="text-xl mb-4 text-center font-semibold">Login</h2>

                <input type="email" placeholder="Email" className="w-full mb-3 px-3 py-2 border rounded" onChange={(e)=> setForm({ ...form, email:e.target.value})}/>
                <input type="password" placeholder="Password" className="w-full mb-3 px-3 py-2 border rounded" onChange={(e)=> setForm({ ...form, password:e.target.value})}/>
                

                <button type="submit" className="w-full bg-[#8d5524] text-white py-2 rounded">Login</button>

                {error && <p className="text-red-500 mt-2 text-sm">{error}</p> }
            </form>
        </div>
    );
}