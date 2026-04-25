import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import healthImg from '../../../assets/health_monitoring.jpg';
import doctorImg from '../../../assets/weekly_doctor.jpg';
import physioImg from '../../../assets/physiotheraphy.jpg';
import diagnosticImg from '../../../assets/diagnostic_care.jpg';
import counselingImg from '../../../assets/counselling.jpg';
import communityImg from '../../../assets/communtiy.jpeg';


const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const SERVICES_DATA = [
  {
    title: 'Regular Health Monitoring',
    description: 'Monthly health check-ups for diabetes, blood pressure, and general wellness.',
    frequency: 'Monthly',
    provider: 'Qualified Nursing Staff',
    image: healthImg

  },
  {
    title: 'Weekly Doctor Visits',
    description: 'A qualified doctor visits for consultations, routine examinations, and treatment reviews.',
    frequency: 'Weekly (Wednesdays)',
    provider: 'Visiting Physician',
    image: doctorImg

  },
  {
    title: 'Physiotherapy Support',
    description: 'Mobility improvement, flexibility, pain reduction, and recovery support.',
    frequency: 'As Needed',
    provider: 'Specialist Physiotherapist',
    image: physioImg

  },
  {
    title: 'Diagnostic Care',
    description: 'Medical tests and evaluations whenever required for accurate treatment.',
    frequency: 'On Demand',
    provider: 'Partner Labs',
    image: diagnosticImg

  },
  {
    title: 'Family Counseling',
    description: 'Support for emotional well-being, loneliness reduction, and family guidance.',
    frequency: 'Bi-Weekly',
    provider: 'Professional Counselor',
    image: counselingImg

  },
  {
    title: 'Compassionate Community',
    description: 'A warm environment where seniors feel valued, safe, and emotionally supported.',
    frequency: 'Daily 24/7',
    provider: 'Resident Caretakers',
    image: communityImg

  }
];

const Services = () => {
  return (
    <div className="bg-background-light min-h-screen py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-24 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-secondary font-black tracking-[0.2em] uppercase text-sm mb-4 block">Compassionate Care</span>
          <h1 className="mb-6 leading-tight">Services & <span className="text-secondary italic">Holistic</span> Care</h1>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            At All Is Well Foundation, we believe every senior deserves dignity, comfort, and compassionate care tailored to their unique journey.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={{
            initial: {},
            whileInView: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {SERVICES_DATA.map((service, index) => (
            <motion.div 
              key={index} 
              className="card group flex flex-col bg-white"
              variants={fadeInUp}
            >
              <div className="h-64 overflow-hidden relative">
                 <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-60" />
                 <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-[10px] font-black uppercase tracking-widest text-primary shadow-premium border border-white/50">
                    {service.frequency}
                 </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl mb-4 text-primary font-bold leading-tight">
                  <span className="text-accent-dark/20 font-black mr-2">0{index + 1}</span>
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-medium mb-6">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Services;
