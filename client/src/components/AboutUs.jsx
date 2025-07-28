import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets'; // Assuming you have your logo or illustration here

const AboutUs = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-screen  mb-16 px-6 md:px-20 bg-light text-center flex flex-col items-center justify-center gap-10"
    >
      <motion.h1 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: -20, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl font-semibold"
      >
        About <span className="text-primary">Torquely</span>
      </motion.h1>

      <motion.p 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-3xl text-gray-600 text-lg leading-7"
      >
        At <strong>Torquely</strong>, we redefine the way you experience luxury transportation. Whether you're planning a weekend getaway, an important business meeting, or just want to cruise in style — we've got you covered. 
        Our mission is simple: make luxury cars accessible, affordable, and unforgettable.
      </motion.p>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <img 
          src={assets.aboutuslaptop || '/about-us.png'} // fallback in case asset is missing
          alt="About Torquely"
          className="max-h-96 -my-24 object-contain "
        />
      </motion.div>

      <motion.p 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-2xl text-gray-500 text-base mt-4"
      >
        With a wide range of premium cars and an easy-to-use booking platform, Torquely is your go-to destination for top-tier car rentals. Trusted by thousands, powered by passion, and driven by service.
      </motion.p>
    </motion.div>
  );
};

export default AboutUs;
