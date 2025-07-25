import { useEffect, useState } from "react";
import axios from '../api/axios';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [contactCount, setContactCount] = useState(0);

    useEffect(() => {
        axios.get('/auth/profile')
            .then((res) => setUser(res.data))
            .catch((err) => console.log('Profile load err', err));

        axios.get('/contacts/count')
            .then((res) => setContactCount(res.data.count))
            .catch((err) => setContactCount(0));
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5dc] font-poppins">
            <div className="max-w-md w-full py-12 px-4 bg-[#f5f5dc] rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-[#8d5524] tracking-wide">My Profile</h2>
                {user ? (
                    <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-lg shadow space-y-2">
                        <div className="w-20 h-20 rounded-full bg-[#e0cda9] flex items-center justify-center text-4xl text-[#8d5524] font-bold mb-2 shadow">
                            {user.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="w-full">
                            <div className="flex items-center mb-2">
                                <span className="font-semibold text-[#c68642] w-28">Username:</span>
                                <span className="text-[#8d5524]">{user.username}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-semibold text-[#c68642] w-28">Email:</span>
                                <span className="text-[#8d5524]">{user.email}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-semibold text-[#c68642] w-28">Total Contacts:</span>
                                <span className="text-[#8d5524]">{contactCount}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-32">
                        <span className="text-[#c68642] animate-pulse">Loading profile...</span>
                    </div>
                )}
            </div>
        </div>
    );
}