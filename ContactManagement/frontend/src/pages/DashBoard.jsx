import { useState, useEffect } from "react";
import axios from '../api/axios';
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
    const [contacts, setContacts] = useState([]);
    const [q, setQ] = useState('');
    const [showFavorites, setShowFavorites] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchContacts = async () => {
        try {
            const res = await axios.get('/contacts', {
                params: {
                    q,
                    favourite: showFavorites ? 'true' : undefined,
                },
            });
            setContacts(res.data);
        } catch (err) {
            setError('Failed to load Contacts');
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [q, showFavorites]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`/contacts/${id}`);
            fetchContacts();
        } catch (err) {
            alert('Delete error');
        }
    };

    const toggleFavorite = async (id, current) => {
        try {
            await axios.patch(`/contacts/${id}/favourite`, { favourite: !current });
            fetchContacts();
        } catch (err) {
            alert('Failed to update Favourites');
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto bg-[#f5f5dc] min-h-screen rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-[#8d5524] text-center">My Contacts</h1>

            <div className="flex flex-col md:flex-row gap-3 mb-6 items-center">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="p-3 border border-[#c68642] rounded w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#c68642] bg-white"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
                <button
                    className={`px-5 py-2 rounded font-semibold transition ${showFavorites
                            ? "bg-[#c68642] text-white hover:bg-[#8d5524]"
                            : "bg-white text-[#8d5524] border border-[#c68642] hover:bg-[#e0cda9]"
                        }`}
                    onClick={() => setShowFavorites(!showFavorites)}
                >
                    {showFavorites ? 'Show All' : 'Show Favourites'}
                </button>
                <button
                    className="px-5 py-2 rounded font-semibold bg-[#8d5524] text-white hover:bg-[#c68642] transition"
                    onClick={() => navigate('/add')}
                >
                    Add Contact
                </button>
            </div>

            {error && <p className="text-red-500 mb-3">{error}</p>}

            <div className="overflow-x-auto rounded shadow">
                <p className="mb-4 text-[#8d5524] font-semibold text-right">
                    Total Contacts: {contacts.length}
                </p>
                <table className="w-full border text-left bg-white">
                    <thead className="bg-[#e0cda9] text-[#8d5524]">
                        <tr>
                            <th className="p-3">Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Fav</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-[#c68642]">No contacts found.</td>
                            </tr>
                        ) : (
                            contacts.map((c) => (
                                <tr key={c._id} className="border-t hover:bg-[#f9f6ef]">
                                    <td className="p-3">{c.name}</td>
                                    <td>{c.email}</td>
                                    <td>{c.phone}</td>
                                    <td>
                                        <button
                                            onClick={() => toggleFavorite(c._id, c.favourite)}
                                            className={`px-3 py-1 rounded text-xl transition ${c.favourite ? 'bg-yellow-300 text-yellow-800' : 'bg-gray-200 text-gray-500'
                                                }`}
                                            title={c.favourite ? "Remove from favourites" : "Add to favourites"}
                                        >
                                            {c.favourite ? '★' : '☆'}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => navigate(`/edit/${c._id}`)}
                                            className="text-[#8d5524] border border-[#c68642] px-3 py-1 rounded mr-2 hover:bg-[#e0cda9] transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(c._id)}
                                            className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-700 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

