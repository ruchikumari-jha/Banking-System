
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CalendarIcon, MoreVertical, LogOut, Plus, X, Shield, CreditCard, Landmark } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/CreditCard';
import { useAuth } from '../context/AuthContext';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

const Dashboard = () => {
    const chartData = [
        { name: 'Mon', income: 4000, expense: 2400 },
        { name: 'Tue', income: 3000, expense: 1398 },
        { name: 'Wed', income: 2000, expense: 9800 },
        { name: 'Thu', income: 2780, expense: 3908 },
        { name: 'Fri', income: 1890, expense: 4800 },
        { name: 'Sat', income: 2390, expense: 3800 },
        { name: 'Sun', income: 3490, expense: 4300 },
    ];
    
    const navigate = useNavigate();
    const { user, accounts, activeAccount, activeAccountIndex, setActiveAccount, addAccount } = useAuth();

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [newBank, setNewBank] = useState('');
    const [newAccountNo, setNewAccountNo] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [modalError, setModalError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('isUnlocked');
        sessionStorage.removeItem('activeAccountIndex');
        navigate('/login');
    };

    const resetModal = () => {
        setNewBank('');
        setNewAccountNo('');
        setNewPin('');
        setConfirmPin('');
        setModalError('');
    };

    const openModal = () => {
        resetModal();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        resetModal();
    };

    const handleAddAccount = (e) => {
        e.preventDefault();
        setModalError('');

        if (!newBank) {
            setModalError('Please select a bank.');
            return;
        }
        if (!newAccountNo.trim()) {
            setModalError('Please enter an account number.');
            return;
        }
        const pinRegex = /^\d{4}$/;
        if (!pinRegex.test(newPin)) {
            setModalError('PIN must be exactly 4 digits.');
            return;
        }
        if (newPin !== confirmPin) {
            setModalError('PINs do not match. Please re-enter.');
            return;
        }

        try {
            addAccount(newBank, newAccountNo.trim(), newPin);
            closeModal();
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2500);
        } catch (err) {
            setModalError(err.message);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex text-gray-800">
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 md:ml-64 p-8 relative">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Banking Dashboard</h1>
                        <p className="text-gray-500">Welcome back, {user ? user.name : 'Guest'}!</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-10 pr-4 py-2 border border-blue-100 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-50/50 shadow-sm transition-all"
                            />
                        </div>
                        
                        <button 
                            onClick={handleLogout}
                            className="bg-white border border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm transition-all font-medium text-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </header>

                {/* Filters */}
                <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
                    <div className="flex bg-white rounded-lg border border-gray-100 p-1 shadow-sm">
                        <button className="px-4 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-md">12 months</button>
                        <button className="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm">30 days</button>
                        <button className="px-4 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-md">7 days</button>
                        <button className="px-4 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-md">24 hours</button>
                    </div>

                    <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 shadow-sm hover:bg-gray-50">
                        <CalendarIcon className="w-4 h-4" />
                        Select Date
                    </button>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Primary Account Column */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-gray-800">
                                {accounts.length > 1 ? 'My Accounts' : 'Primary account'}
                            </h3>
                            <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
                        </div>

                        {/* Account Switcher Tabs */}
                        {accounts.length > 1 && (
                            <div className="flex gap-2 flex-wrap">
                                {accounts.map((acc, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveAccount(idx)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                                            idx === activeAccountIndex
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                                        }`}
                                    >
                                        {acc.bank}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Credit Card */}
                        <Card
                            bank={activeAccount?.bank}
                            accountNo={activeAccount?.accountNo}
                            holderName={user?.name || 'User'}
                        />

                        {/* Income / Expense Summary */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                        <span className="font-bold">Iy</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Income</p>
                                        <p className="text-xs text-gray-400">Total Monthly Income</p>
                                    </div>
                                </div>
                                <span className="text-green-600 font-bold">+$4,250</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                                        <span className="font-bold">Ex</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Expense</p>
                                        <p className="text-xs text-gray-400">Total Monthly Expense</p>
                                    </div>
                                </div>
                                <span className="text-red-500 font-bold">-$1,550</span>
                            </div>
                        </div>
                    </div>

                    {/* Charts Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Income Chart */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-gray-800">Total Income</h3>
                                        <p className="text-gray-400 text-xs">August 2023</p>
                                        <h2 className="text-2xl font-bold mt-2 text-gray-900">$6,421.10</h2>
                                    </div>
                                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg flex items-center gap-1">
                                        ↗ 2.0%
                                    </span>
                                </div>
                                <div className="h-24">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <Line type="monotone" dataKey="income" stroke="#2563EB" strokeWidth={3} dot={false} />
                                            <Tooltip />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Expense Chart */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-gray-800">Total Expense</h3>
                                        <p className="text-gray-400 text-xs">August 2023</p>
                                        <h2 className="text-2xl font-bold mt-2 text-gray-900">$561.30</h2>
                                    </div>
                                    <span className="px-2 py-1 bg-red-50 text-red-500 text-xs font-bold rounded-lg flex items-center gap-1">
                                        ↘ 1.2%
                                    </span>
                                </div>
                                <div className="h-24">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} dot={false} />
                                            <Tooltip />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Large Chart Area */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64 flex flex-col justify-center items-center text-gray-400">
                            <p>Detailed Transaction History Visualization would go here</p>
                        </div>
                    </div>
                </div>

                {/* ============ Floating "Add Account" Button ============ */}
                <button
                    id="add-account-fab"
                    onClick={openModal}
                    className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-40 group"
                    title="Add New Account"
                >
                    <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Tooltip for FAB */}
                <div className="fixed bottom-10 right-24 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-40 hidden md:block">
                    Add New Account
                </div>

                {/* ============ Success Toast ============ */}
                {showSuccess && (
                    <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 flex items-center gap-2 animate-bounce">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Account added successfully!
                    </div>
                )}

                {/* ============ Add Account Modal ============ */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
                        <div
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-gray-100"
                            onClick={(e) => e.stopPropagation()}
                            style={{ animation: 'modalSlideIn 0.3s ease-out' }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header */}
                            <div className="text-center mb-6">
                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                    <Plus className="w-7 h-7 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Add New Account</h2>
                                <p className="text-gray-500 text-sm">Link another bank account</p>
                            </div>

                            <form onSubmit={handleAddAccount} className="space-y-5">
                                {/* Bank Select */}
                                <div className="relative">
                                    <select
                                        value={newBank}
                                        onChange={(e) => setNewBank(e.target.value)}
                                        className="w-full border-b-2 border-gray-200 py-3 text-gray-700 focus:outline-none focus:border-blue-500 transition-colors bg-transparent appearance-none cursor-pointer text-sm"
                                        required
                                    >
                                        <option value="" disabled>Select Your Bank</option>
                                        <option value="Apna Bank">Apna Bank</option>
                                        <option value="SBI">SBI</option>
                                        <option value="HDFC">HDFC</option>
                                        <option value="ICICI">ICICI</option>
                                        <option value="Axis Bank">Axis Bank</option>
                                    </select>
                                    <Landmark className="absolute right-0 top-3 text-gray-400 w-5 h-5 pointer-events-none" />
                                </div>

                                {/* Account Number */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Account Number"
                                        value={newAccountNo}
                                        onChange={(e) => setNewAccountNo(e.target.value)}
                                        className="w-full border-b-2 border-gray-200 py-3 text-gray-700 focus:outline-none focus:border-blue-500 transition-colors bg-transparent text-sm"
                                        required
                                    />
                                    <CreditCard className="absolute right-0 top-3 text-gray-400 w-5 h-5" />
                                </div>

                                {/* PIN */}
                                <div className="relative">
                                    <input
                                        type="password"
                                        placeholder="Enter 4-Digit PIN"
                                        value={newPin}
                                        onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                        maxLength={4}
                                        className="w-full border-b-2 border-gray-200 py-3 text-gray-700 focus:outline-none focus:border-blue-500 transition-colors bg-transparent text-sm"
                                        required
                                    />
                                    <Shield className="absolute right-0 top-3 text-gray-400 w-5 h-5" />
                                </div>

                                {/* Confirm PIN */}
                                <div className="relative">
                                    <input
                                        type="password"
                                        placeholder="Confirm 4-Digit PIN"
                                        value={confirmPin}
                                        onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                        maxLength={4}
                                        className="w-full border-b-2 border-gray-200 py-3 text-gray-700 focus:outline-none focus:border-blue-500 transition-colors bg-transparent text-sm"
                                        required
                                    />
                                    <Shield className="absolute right-0 top-3 text-blue-400 w-5 h-5" />
                                </div>

                                {/* Error */}
                                {modalError && (
                                    <div className="text-red-500 text-xs text-center font-medium bg-red-50 py-2 px-3 rounded-lg">
                                        {modalError}
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all font-bold text-sm tracking-wide active:scale-95"
                                    >
                                        Add Account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal animation keyframes */}
            <style>{`
                @keyframes modalSlideIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
