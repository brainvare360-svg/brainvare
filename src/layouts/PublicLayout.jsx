'use client'

import React from 'react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const PublicLayout = () => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default PublicLayout;
