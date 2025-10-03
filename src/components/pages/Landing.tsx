import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { Testimonials } from '../components/landing/Testimonials';
import { FAQ } from '../components/landing/FAQ';
import { Footer } from '../components/landing/Footer';
import { Navbar } from '../components/landing/Navbar';
export const Landing: React.FC = () => {
  return <div className="min-h-screen bg-white dark:bg-secondary-900">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>;
};