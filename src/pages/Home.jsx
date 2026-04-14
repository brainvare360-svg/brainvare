import React from 'react';
import Hero from '../components/home/Hero';
import Showreel from '../components/home/Showreel';
import Services from '../components/home/Services';
import ReelsWall from '../components/home/ReelsWall';
import BrandingCollage from '../components/home/BrandingCollage';
import SeoPerformance from '../components/home/SeoPerformance';
import About from '../components/home/About';
import Reviews from '../components/home/Reviews';
import Contact from '../components/home/Contact';

const Home = () => {
    return (
        <main>
            <Hero />
            <Showreel />
            <Services />
            <ReelsWall />
            <BrandingCollage />
            <SeoPerformance />
            <About />
            <Reviews />
            <Contact />
        </main>
    );
};

export default Home;
