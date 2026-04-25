import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Coffee, ShieldCheck, ArrowRight } from 'lucide-react';
import { donationService } from '../../../services/donation.service';
import toast from 'react-hot-toast';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const Donate = () => {
  const categories = [
    {
      title: "Sponsor a Meal",
      desc: "Provide a nutritious, home-cooked meal for all our residents for one day.",
      amount: "₹ 5,000",
      icon: <Coffee className="w-8 h-8" />,
      color: "bg-primary"
    },
    {
      title: "Monthly Support",
      desc: "Covers the general care, hygiene, and companionship needs of one resident.",
      amount: "₹ 15,000",
      icon: <Heart className="w-8 h-8" />,
      color: "bg-secondary"
    },
    {
      title: "Medical Fund",
      desc: "Supports medical monitoring, doctor visits, and emergency tests.",
      amount: "₹ 10,000",
      icon: <ShieldCheck className="w-8 h-8" />,
      color: "bg-accent-dark"
    }
  ];

  const handleDonateClick = (category) => {
    toast.success(`Thank you for your interest in sponsoring: ${category}. Please contact us to complete the donation!`);
  };

  return (
    <div className="bg-background-light min-h-screen py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-24 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-secondary font-black tracking-[0.2em] uppercase text-sm mb-4 block">Support Our Mission</span>
          <h1 className="mb-6 leading-tight">Every Contribution <span className="text-secondary italic">Empowers</span> a Life</h1>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            Your donations go directly toward the health, happiness, and dignity of our senior citizens.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 mb-32">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              className="bg-white p-12 rounded-[3.5rem] shadow-premium flex flex-col group border border-gray-50"
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`w-20 h-20 ${cat.color} text-white rounded-3xl flex items-center justify-center mb-10 shadow-lg group-hover:rotate-12 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{cat.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-10 flex-grow">{cat.desc}</p>
              <div className="pt-10 border-t border-gray-100 mt-auto">
                <div className="text-3xl font-serif font-black text-primary mb-6 italic">{cat.amount}</div>
                <button 
                  onClick={() => handleDonateClick(cat.title)}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:bg-secondary transition-all shadow-soft"
                >
                  Sponsor Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Donation / Bank Details */}
        <motion.div 
          className="bg-white rounded-[4rem] shadow-premium p-12 md:p-24 grid lg:grid-cols-2 gap-20 items-center border border-white"
          {...fadeInUp}
        >
          <div>
             <h2 className="text-4xl font-serif font-black text-primary mb-8 leading-tight">Other Ways to <span className="text-secondary italic">Give</span></h2>
             <p className="text-gray-500 text-lg font-medium leading-relaxed mb-10">
               You can also make a direct bank transfer or visit our center to donate in person. We accept donations in kind (medicines, groceries, furniture) as well.
             </p>
             <div className="space-y-6">
                <div className="p-6 bg-background-light rounded-2xl border border-gray-100">
                   <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Bank Details</div>
                   <div className="text-lg font-bold text-primary">All Is Well Foundation</div>
                   <div className="text-gray-600 font-medium">Bank Name: XYZ Bank</div>
                   <div className="text-gray-600 font-medium">Account: 1234567890</div>
                   <div className="text-gray-600 font-medium">IFSC: XYZ000123</div>
                </div>
             </div>
          </div>

          <div className="bg-primary/5 rounded-[3rem] p-12 border-2 border-dashed border-primary/20 flex flex-col items-center text-center">
             <Sparkles className="w-16 h-16 text-secondary mb-8" />
             <h3 className="text-2xl font-bold text-primary mb-4">Tax Benefits</h3>
             <p className="text-gray-500 font-medium leading-relaxed">
               All Is Well Foundation is a registered NGO. Your donations are eligible for tax exemptions under Section 80G of the Income Tax Act.
             </p>
             <button 
                onClick={() => handleDonateClick('General')}
                className="mt-10 inline-flex items-center text-primary font-black uppercase tracking-widest hover:text-secondary transition-colors"
              >
                Inquire about Receipts <ArrowRight className="ml-3 w-5 h-5" />
              </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Donate;
