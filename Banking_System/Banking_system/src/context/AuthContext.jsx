import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeAccountIndex, setActiveAccountIndex] = useState(0);

    useEffect(() => {
        // Initialize state from storage
        const storedUser = localStorage.getItem('currentUser');
        const storedUnlocked = sessionStorage.getItem('isUnlocked') === 'true';
        const storedActiveIndex = sessionStorage.getItem('activeAccountIndex');

        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            // Migrate legacy single-account format to accounts array
            if (!parsed.accounts && parsed.accountNo) {
                parsed.accounts = [{ bank: parsed.bank, accountNo: parsed.accountNo, pin: parsed.pin }];
                localStorage.setItem('currentUser', JSON.stringify(parsed));
                localStorage.setItem(parsed.email, JSON.stringify(parsed));
            } else if (!parsed.accounts) {
                parsed.accounts = [];
            }
            setUser(parsed);
        }
        setIsUnlocked(storedUnlocked);
        if (storedActiveIndex !== null) {
            setActiveAccountIndex(parseInt(storedActiveIndex, 10) || 0);
        }
        setLoading(false);
    }, []);

    const register = (userData) => {
        const newUser = { ...userData, accounts: [] };
        localStorage.setItem(newUser.email, JSON.stringify(newUser));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setUser(newUser);
        setIsUnlocked(false);
        sessionStorage.setItem('isUnlocked', 'false');
    };

    const login = (email, password) => {
        const storedUser = localStorage.getItem(email);
        if (!storedUser) {
            throw new Error("Email not found. Please register first.");
        }

        const userData = JSON.parse(storedUser);
        if (userData.password !== password) {
            throw new Error("Incorrect password.");
        }

        // Migrate legacy format
        if (!userData.accounts && userData.accountNo) {
            userData.accounts = [{ bank: userData.bank, accountNo: userData.accountNo, pin: userData.pin }];
        } else if (!userData.accounts) {
            userData.accounts = [];
        }

        localStorage.setItem('currentUser', JSON.stringify(userData));
        setUser(userData);
        setIsUnlocked(false);
        setActiveAccountIndex(0);
        sessionStorage.setItem('isUnlocked', 'false');
        sessionStorage.setItem('activeAccountIndex', '0');
    };

    const unlock = (pin, bank, accountNo) => {
        if (!user) throw new Error("No user found.");

        if (user.accounts && user.accounts.length > 0) {
            // Verification Mode — check against first account (primary)
            const primary = user.accounts[0];
            if (primary.bank !== bank) throw new Error("Incorrect Bank selected.");
            if (primary.accountNo !== accountNo) throw new Error("Invalid Account Number.");
            if (primary.pin !== pin) throw new Error("Invalid PIN.");
        } else if (user.accountNo) {
            // Legacy verification
            if (user.bank !== bank) throw new Error("Incorrect Bank selected.");
            if (user.accountNo !== accountNo) throw new Error("Invalid Account Number.");
            if (user.pin !== pin) throw new Error("Invalid PIN.");
        } else {
            // Setup Mode — first account
            const updatedUser = {
                ...user,
                bank,
                pin,
                accountNo,
                accounts: [{ bank, accountNo, pin }]
            };
            localStorage.setItem(user.email, JSON.stringify(updatedUser));
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            setUser(updatedUser);
        }

        setIsUnlocked(true);
        setActiveAccountIndex(0);
        sessionStorage.setItem('isUnlocked', 'true');
        sessionStorage.setItem('activeAccountIndex', '0');
    };

    const addAccount = (bank, accountNo, pin) => {
        if (!user) throw new Error("No user found.");

        // Duplicate check
        const duplicate = (user.accounts || []).find(
            (a) => a.bank === bank && a.accountNo === accountNo
        );
        if (duplicate) {
            throw new Error("This account is already linked.");
        }

        const newAccounts = [...(user.accounts || []), { bank, accountNo, pin }];
        const updatedUser = { ...user, accounts: newAccounts };

        localStorage.setItem(user.email, JSON.stringify(updatedUser));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setUser(updatedUser);

        const newIndex = newAccounts.length - 1;
        setActiveAccountIndex(newIndex);
        sessionStorage.setItem('activeAccountIndex', String(newIndex));
    };

    const setActiveAccount = (index) => {
        setActiveAccountIndex(index);
        sessionStorage.setItem('activeAccountIndex', String(index));
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('isUnlocked');
        sessionStorage.removeItem('activeAccountIndex');
        setUser(null);
        setIsUnlocked(false);
        setActiveAccountIndex(0);
    };

    const accounts = user?.accounts || [];
    const activeAccount = accounts[activeAccountIndex] || accounts[0] || null;

    const value = {
        user,
        isUnlocked,
        register,
        login,
        unlock,
        logout,
        loading,
        accounts,
        activeAccount,
        activeAccountIndex,
        addAccount,
        setActiveAccount,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
