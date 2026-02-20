
import React from 'react';
import { LayoutDashboard, CreditCard, ArrowRightLeft, FileBarChart, User, Home } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { isUnlocked } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', protected: true },
        { icon: CreditCard, label: 'Cards', path: '/cards', protected: true },
        { icon: ArrowRightLeft, label: 'Transactions', path: '/transaction', protected: true },
        { icon: FileBarChart, label: 'Reporting', path: '/reporting', protected: true },
        { icon: User, label: 'Account', path: '/account', protected: false },
    ];

    const filteredItems = menuItems.filter(item => !item.protected || isUnlocked);

    return (
        <div className="w-64 bg-white min-h-screen border-r border-gray-100 flex flex-col p-6 hidden md:flex fixed left-0 top-0">
            {/* Logo */}
            <div className="mb-12">
                <h1 className="text-2xl font-bold italic tracking-tighter text-gray-900">Apna Bank</h1>
            </div>

            {/* Menu */}
            <nav className="flex-1 space-y-2">
                {filteredItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3 rounded-xl transition-colors duration-200
              ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
            `}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto">
                {/* Helper/Logout or extra content could go here */}
            </div>
        </div>
    );
};

export default Sidebar;
