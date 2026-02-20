
import React from 'react';
import Sidebar from '../components/Sidebar';
import { User, Mail, CreditCard, Shield, Edit, Landmark } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Account = () => {
    const { user, accounts } = useAuth();

    if (!user) {
        return (
            <div className="bg-gray-50 min-h-screen flex text-gray-800">
                <Sidebar />
                <div className="flex-1 md:ml-64 p-8 flex items-center justify-center">
                    <p className="text-gray-500">Loading user profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen flex text-gray-800">
            <Sidebar />
            <div className="flex-1 md:ml-64 p-8">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
                    <p className="text-gray-500">Manage your profile and settings</p>
                </header>

                <div className="max-w-3xl">
                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                        <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400 relative">
                            <div className="absolute -bottom-10 left-8">
                                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
                                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                        <User className="w-10 h-10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-12 px-8 pb-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{user.name || 'User Name'}</h2>
                                    <p className="text-gray-500">Premium Member</p>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                                    <Edit className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-500" /> Personal Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-semibold">Full Name</p>
                                    <p className="text-gray-800 font-medium">{user.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-semibold">Email Address</p>
                                    <p className="text-gray-800 font-medium flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" /> {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Linked Accounts */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-green-500" /> Linked Accounts
                                <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                                    {accounts.length}
                                </span>
                            </h3>
                            <div className="space-y-4">
                                {accounts.length === 0 ? (
                                    <p className="text-gray-400 text-sm">No accounts linked yet.</p>
                                ) : (
                                    accounts.map((acc, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                <Landmark className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-800 text-sm">{acc.bank}</p>
                                                <p className="text-gray-500 text-xs font-mono truncate">
                                                    ••••{acc.accountNo.slice(-4)}
                                                </p>
                                            </div>
                                            {idx === 0 && (
                                                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold flex-shrink-0">
                                                    Primary
                                                </span>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-purple-500" /> Security
                            </h3>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-800">Password</p>
                                    <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                                </div>
                                <button className="text-blue-600 text-sm font-medium hover:underline">Change Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
