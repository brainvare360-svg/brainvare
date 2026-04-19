import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const EnquiriesContext = createContext();

export const useEnquiries = () => {
    const context = useContext(EnquiriesContext);
    if (!context) {
        throw new Error('useEnquiries must be used within an EnquiriesProvider');
    }
    return context;
};

export const EnquiriesProvider = ({ children }) => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load enquiries from API (only if admin is authenticated)
    const fetchEnquiries = async () => {
        const token = localStorage.getItem('brainvare_auth_token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/enquiries`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setEnquiries(data);
            }
        } catch (error) {
            console.error("Failed to load enquiries:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    // Add a new enquiry (public — contact form)
    const addEnquiry = async (enquiryData) => {
        try {
            const res = await fetch(`${API_URL}/enquiries`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(enquiryData),
            });
            if (!res.ok) throw new Error('Failed to submit enquiry');
            const data = await res.json();

            // Add to local state if admin is viewing
            const newEnquiry = {
                id: data.id,
                ...enquiryData,
                status: 'new',
                created_at: new Date().toISOString(),
            };
            setEnquiries(prev => [newEnquiry, ...prev]);
        } catch (error) {
            console.error("Error adding enquiry:", error);
            throw error;
        }
    };

    // Update enquiry status (admin only)
    const updateEnquiryStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('brainvare_auth_token');
            await fetch(`${API_URL}/enquiries/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });
            setEnquiries(prev =>
                prev.map(e => e.id === id ? { ...e, status } : e)
            );
        } catch (error) {
            console.error("Error updating enquiry:", error);
        }
    };

    // Delete an enquiry (admin only)
    const deleteEnquiry = async (id) => {
        try {
            const token = localStorage.getItem('brainvare_auth_token');
            await fetch(`${API_URL}/enquiries/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setEnquiries(prev => prev.filter(e => e.id !== id));
        } catch (error) {
            console.error("Error deleting enquiry:", error);
        }
    };

    const getEnquiry = (id) => enquiries.find(e => e.id === id);

    const getStats = () => {
        const total = enquiries.length;
        const newCount = enquiries.filter(e => e.status === 'new').length;
        const readCount = enquiries.filter(e => e.status === 'read').length;
        const repliedCount = enquiries.filter(e => e.status === 'replied').length;
        return { total, new: newCount, read: readCount, replied: repliedCount };
    };

    const clearAllEnquiries = async () => {
        if (window.confirm('Are you sure you want to delete all enquiries? This cannot be undone.')) {
            try {
                const token = localStorage.getItem('brainvare_auth_token');
                await fetch(`${API_URL}/enquiries`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                setEnquiries([]);
            } catch (error) {
                console.error("Error clearing enquiries:", error);
            }
        }
    };

    return (
        <EnquiriesContext.Provider value={{
            enquiries, loading, addEnquiry, updateEnquiryStatus,
            deleteEnquiry, getEnquiry, getStats, clearAllEnquiries,
            refreshEnquiries: fetchEnquiries
        }}>
            {children}
        </EnquiriesContext.Provider>
    );
};
