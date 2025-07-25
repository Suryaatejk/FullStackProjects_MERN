import { useState } from "react";
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('/auth/signup', form);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data.msg || 'Sign up error');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5dc]">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-80 flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold text-center mb-2 text-[#8d5524]">Sign Up</h2>
                <input
                    placeholder="Username"
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={e => setForm({ ...form, username: e.target.value })}
                />
                <input
                    placeholder="Email"
                    type="email"
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <input
                    placeholder="Password"
                    type="password"
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button
                    type="submit"
                    className="bg-[#8d5524] text-[#f5f5dc] py-2 rounded hover:bg-[#c68642] transition"
                >
                    Sign Up
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
        </div>
    );
}

