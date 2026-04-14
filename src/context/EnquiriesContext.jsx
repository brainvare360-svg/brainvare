import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, query, orderBy, onSnapshot, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';

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

    // Setup real-time listener on mounting
    useEffect(() => {
        const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const enquiriesData = [];
            querySnapshot.forEach((doc) => {
                enquiriesData.push({ id: doc.id, ...doc.data() });
            });
            setEnquiries(enquiriesData);
            setLoading(false);
        }, (error) => {
            console.error("Firebase real-time listener error:", error);
            
            // Fallback to localStorage if Firebase fails (offline or permission denied initially)
            try {
                const saved = localStorage.getItem('brainvare_enquiries');
                if (saved) setEnquiries(JSON.parse(saved));
            } catch (e) { }
            
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Also persist to localStorage as backup
    useEffect(() => {
        try {
            if(!loading && enquiries.length > 0) {
                 localStorage.setItem('brainvare_enquiries', JSON.stringify(enquiries));
            }
        } catch (error) {
           console.error("Failed to backup enquiries to localStorage", error);
        }
    }, [enquiries, loading]);

    // Add a new enquiry
    const addEnquiry = async (enquiryData) => {
        const newEnquiry = {
            ...enquiryData,
            createdAt: new Date().toISOString(),
            status: 'new' // new, read, replied
        };
        
        try {
           await addDoc(collection(db, 'enquiries'), newEnquiry);
        } catch(error) {
           console.error("Error adding document: ", error);
           throw error; // Let the caller handle UI state
        }
    };

    // Update enquiry status
    const updateEnquiryStatus = async (id, status) => {
        try {
            const enquiryRef = doc(db, 'enquiries', id);
            await updateDoc(enquiryRef, { status });
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    // Delete an enquiry
    const deleteEnquiry = async (id) => {
        try {
            await deleteDoc(doc(db, 'enquiries', id));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    // Get enquiry by ID
    const getEnquiry = (id) => {
        return enquiries.find(enquiry => enquiry.id === id);
    };

    // Get counts by status
    const getStats = () => {
        const total = enquiries.length;
        const newCount = enquiries.filter(e => e.status === 'new').length;
        const readCount = enquiries.filter(e => e.status === 'read').length;
        const repliedCount = enquiries.filter(e => e.status === 'replied').length;
        return { total, new: newCount, read: readCount, replied: repliedCount };
    };

    // Clear all enquiries
    const clearAllEnquiries = async () => {
        if (window.confirm('Are you sure you want to delete all enquiries? This cannot be undone.')) {
            try {
                const batch = writeBatch(db);
                enquiries.forEach((enquiry) => {
                    const docRef = doc(db, 'enquiries', enquiry.id);
                    batch.delete(docRef);
                });
                await batch.commit();
            } catch (error) {
                console.error("Error batch deleting documents:", error);
            }
        }
    };

    return (
        <EnquiriesContext.Provider value={{
            enquiries,
            loading,
            addEnquiry,
            updateEnquiryStatus,
            deleteEnquiry,
            getEnquiry,
            getStats,
            clearAllEnquiries
        }}>
            {children}
        </EnquiriesContext.Provider>
    );
};
