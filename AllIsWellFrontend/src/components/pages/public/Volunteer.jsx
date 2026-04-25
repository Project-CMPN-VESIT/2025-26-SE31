import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Sun, Coffee, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const Volunteer = () => {
  return (
    <div className="bg-background-light min-h-screen py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-24 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-secondary font-black tracking-[0.2em] uppercase text-sm mb-4 block">Give Back</span>
          <h1 className="mb-6 leading-tight">Become a <span className="text-secondary italic">Volunteer</span></h1>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            Your time and presence are the greatest gifts you can give to our residents. Join us in making their days brighter.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-32">
          {[
            {
              title: "Social Interaction",
              desc: "Read books, play board games, or simply have a conversation with our seniors.",
              icon: <Coffee className="w-8 h-8" />,
              color: "bg-primary"
            },
            {
              title: "Skill Sharing",
              desc: "Teach a craft, lead a yoga session, or perform music for our community.",
              icon: <Sun className="w-8 h-8" />,
              color: "bg-secondary"
            },
            {
              title: "Event Support",
              desc: "Help us organize and manage special events and festive celebrations.",
              icon: <Users className="w-8 h-8" />,
              color: "bg-accent-dark"
            },
            {
              title: "Digital Help",
              desc: "Assist seniors in connecting with their families via video calls and social media.",
              icon: <Heart className="w-8 h-8" />,
              color: "bg-primary"
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              className="bg-white p-12 rounded-[3rem] shadow-premium flex items-start group hover:-translate-y-2 transition-all border border-gray-50"
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`w-16 h-16 ${item.color} text-white rounded-2xl flex items-center justify-center mr-8 shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="bg-primary rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden"
          {...fadeInUp}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -ml-32 -mb-32" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-black mb-8 leading-tight italic text-background-light">Ready to make a difference?</h2>
            <p className="text-white/80 text-xl font-medium mb-12 leading-relaxed">
              We welcome individuals and groups. Fill out our enquiry form and select "Volunteer Application" to get started.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center px-12 py-5 bg-secondary text-white rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all shadow-premium"
            >
              Apply Now <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Volunteer;
