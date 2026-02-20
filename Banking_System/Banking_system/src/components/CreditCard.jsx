
import React from 'react';

const Card = ({ bank = 'HDFC', accountNo = '456789', holderName = 'RUCHI' }) => {
    // Mask account number: show last 6 digits
    const displayAccNo = accountNo.length > 6 ? accountNo.slice(-6) : accountNo;
    // Format as card-style groups
    const formatCardNumber = (num) => {
        const padded = num.padStart(16, '•');
        return padded.match(/.{1,4}/g)?.join(' ') || padded;
    };

    // Pick gradient colours based on bank
    const bankColors = {
        'Apna Bank': 'from-indigo-600 to-indigo-400',
        'SBI': 'from-blue-700 to-blue-500',
        'HDFC': 'from-blue-600 to-blue-500',
        'ICICI': 'from-orange-600 to-orange-400',
        'Axis Bank': 'from-purple-600 to-purple-400',
    };
    const gradient = bankColors[bank] || 'from-blue-600 to-blue-500';

    return (
        <div className={`relative w-full max-w-md h-56 bg-gradient-to-br ${gradient} rounded-3xl shadow-xl p-6 text-white overflow-hidden transform hover:scale-105 transition-transform duration-300`}>
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-white/70 text-xs font-semibold tracking-wider uppercase">{bank}</p>
                        <h3 className="text-3xl font-bold mt-1">$40,206.20</h3>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-blue-100/80 text-xs tracking-widest mb-1">{holderName.toUpperCase()}</p>
                        <p className="text-lg tracking-widest font-mono">{displayAccNo}</p>
                    </div>

                    <div className="flex flex-col items-end">
                        <p className="text-blue-100/80 text-xs mb-1">06/24</p>
                        {/* Mastercard Circles */}
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-red-500/90 mix-blend-screen"></div>
                            <div className="w-8 h-8 rounded-full bg-yellow-400/90 mix-blend-screen"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
