import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const OurThought = () => {
  return (
    <div className="bg-background-light min-h-screen py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-24 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-secondary font-black tracking-[0.2em] uppercase text-sm mb-4 block">Our Philosophy</span>
          <h1 className="mb-6 leading-tight">A <span className="text-secondary italic">Visionary</span> Approach to Care</h1>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          className="bg-white rounded-[4rem] shadow-premium border border-white p-12 md:p-20 mb-24 relative overflow-hidden"
          {...fadeInUp}
        >
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent via-secondary to-primary" />
           <h2 className="text-3xl md:text-4xl font-serif font-black text-primary mb-12 max-w-4xl mx-auto leading-tight italic text-center">
             "Modern residential buildings include amenities like gyms, gardens, and terraces. We believe they should also include dedicated spaces for our elders."
           </h2>
           <div className="text-left max-w-4xl mx-auto space-y-8">
             <div className="grid md:grid-cols-2 gap-12 text-xl text-gray-600 leading-relaxed font-medium">
                <p>If builders reserve two or more flats specifically for senior citizens, families could leave elderly parents there during the day while they work.</p>
                <p>These spaces would have trained caretakers and a small community of seniors, creating a safe and engaging environment.</p>
             </div>
             <p className="text-xl text-gray-600 leading-relaxed font-medium">Instead of staying alone at home, seniors would enjoy companionship, activities, and proper care right where they live.</p>
             <div className="bg-background-light p-10 rounded-[2.5rem] border border-primary/5 shadow-soft">
               <p className="text-2xl font-bold text-primary leading-relaxed text-center">
                 This would reduce loneliness for seniors and emotional guilt for families. It would transform elderly care into a positive and supportive community feature.
               </p>
             </div>
           </div>
        </motion.div>

      </div>
    </div>
  );
};

export default OurThought;
