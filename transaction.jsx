import React from 'react';
import Sidebar from '../components/Sidebar';
import { ArrowUpRight, ArrowDownLeft, Search, Filter } from 'lucide-react';

const Transaction = () => {
    // Mock Data
    const transactions = [
        { id: 1, name: 'Spotify Premium', date: 'Oct 23, 2023', type: 'Subscription', amount: -15.00, status: 'Completed', icon: ArrowUpRight, color: 'text-red-500' },
        { id: 2, name: 'Salary Received', date: 'Oct 21, 2023', type: 'Salary', amount: 4500.00, status: 'Completed', icon: ArrowDownLeft, color: 'text-green-500' },
        { id: 3, name: 'Grocery Store', date: 'Oct 20, 2023', type: 'Food', amount: -65.40, status: 'Completed', icon: ArrowUpRight, color: 'text-red-500' },
        { id: 4, name: 'Electric Bill', date: 'Oct 18, 2023', type: 'Utility', amount: -120.00, status: 'Pending', icon: ArrowUpRight, color: 'text-yellow-500' },
        { id: 5, name: 'Freelance Work', date: 'Oct 15, 2023', type: 'Income', amount: 850.00, status: 'Completed', icon: ArrowDownLeft, color: 'text-green-500' },
        { id: 6, name: 'Transfer to Savings', date: 'Oct 12, 2023', type: 'Transfer', amount: -1000.00, status: 'Completed', icon: ArrowUpRight, color: 'text-blue-500' },
        { id: 7, name: 'Coffee Shop', date: 'Oct 12, 2023', type: 'Food', amount: -5.50, status: 'Completed', icon: ArrowUpRight, color: 'text-red-500' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex text-gray-800">
            <Sidebar />
            <div className="flex-1 md:ml-64 p-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
                        <p className="text-gray-500">View and manage your recent transactions.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white shadow-sm w-64"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 shadow-sm hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                    </div>
                </header>

                {/* Transactions Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                    <th className="px-6 py-4">Transaction Name</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {transactions.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100`}>
                                                    <t.icon className={`w-4 h-4 ${t.amount > 0 ? 'text-green-600' : 'text-gray-600'}`} />
                                                </div>
                                                <span className="font-medium text-gray-900">{t.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{t.date}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{t.type}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${t.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                    t.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 text-right font-semibold ${t.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                            {t.amount > 0 ? '+' : ''}${Math.abs(t.amount).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transaction;