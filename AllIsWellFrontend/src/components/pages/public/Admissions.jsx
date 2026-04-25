import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ClipboardList, ShieldCheck, Heart, Users, Calendar } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const Admissions = () => {
  const processSteps = [
    {
      title: "Initial Enquiry",
      desc: "Contact us via our form or WhatsApp to share your requirements.",
      icon: <ClipboardList className="w-8 h-8" />
    },
    {
      title: "Personal Visit",
      desc: "Schedule a visit to our center to see our facilities and meet the staff.",
      icon: <Calendar className="w-8 h-8" />
    },
    {
      title: "Medical Assessment",
      desc: "Our medical team will conduct a basic assessment to understand care needs.",
      icon: <ShieldCheck className="w-8 h-8" />
    },
    {
      title: "Welcome Home",
      desc: "Complete the documentation and join our warm community.",
      icon: <Heart className="w-8 h-8" />
    }
  ];

  return (
    <div className="bg-background-light min-h-screen py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-24 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-secondary font-black tracking-[0.2em] uppercase text-sm mb-4 block">Admission Process</span>
          <h1 className="mb-6 leading-tight">Joining the <span className="text-secondary italic">Family</span></h1>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            We understand that choosing a home is a big decision. We are here to make the transition smooth, dignified, and comfortable.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-4 gap-8 mb-32">
          {processSteps.map((step, i) => (
            <motion.div 
              key={i}
              className="bg-white p-10 rounded-[2.5rem] shadow-premium relative group border border-gray-50"
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-primary/10 font-black text-6xl absolute top-6 right-8 group-hover:text-secondary/10 transition-colors">0{i+1}</div>
              <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:text-white transition-all">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">{step.title}</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-serif font-black text-primary mb-8 leading-tight">Eligibility & <span className="text-secondary italic">Care Levels</span></h2>
            <div className="space-y-6">
              {[
                "Senior citizens aged 60 and above.",
                "Individuals requiring assisted living or companionship.",
                "Non-critical medical monitoring and nursing support.",
                "Short-term and long-term stay options available."
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-secondary mr-4 shrink-0 mt-1" />
                  <p className="text-lg text-gray-600 font-medium">{item}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-8 bg-white rounded-3xl border border-primary/10 shadow-soft">
              <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-4">Cost of Care</h4>
              <p className="text-gray-500 font-medium leading-relaxed">
                As an NGO, we strive to keep costs minimal while maintaining high standards of care. Costs vary based on the room type (shared/private) and the level of medical attention required. Please contact us for a detailed quote.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="rounded-[3rem] overflow-hidden shadow-premium border-8 border-white"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <img src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200" alt="Seniors enjoying" className="w-full h-[600px] object-cover" />
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Admissions;
