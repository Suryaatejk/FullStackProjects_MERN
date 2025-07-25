import { useState, useEffect } from "react";
import axios from '../api/axios';
import { useNavigate, useParams } from "react-router-dom";

export default function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    const isEdit = Boolean(id);

    useEffect(() => {
        if (isEdit) {
            axios.get(`/contacts/${id}`).then((res) => {
                setForm(res.data);
            });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEdit) {
                await axios.put(`/contacts/${id}`, form);
            }
            else {
                await axios.post('/contacts', form);
            }
            navigate('/dashboard');
        } catch (err) { alert('Submit Failed'); }
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h2 className="text-2xl mb-4">{isEdit ? 'Edit' : 'Add'} Contact </h2>

            <form onSubmit={handleSubmit} className="grid gap-4">
                <input type="name" placeholder="Name" className="p-2 border rounded" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input type="email" placeholder="Email" className="p-2 border rounded" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="phone" placeholder="Phone" className="p-2 border rounded" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <textarea type="name" placeholder="Address" className="p-2 border rounded" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                <button type="submit" className="bg-[#8d5524] text-white py-2 rounded">{isEdit ? 'Update' : 'Add'}</button>
            </form>
            <button
                type="button"
                className="bg-red-300 text-[#8d5524] px-4 py-2 rounded mt-4 hover:bg-red-500 transition"
                onClick={() => navigate('/')}
            >
                Cancel
            </button>
        </div>
    );
}