import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Sparkles, Quote, Sun, Users } from 'lucide-react';
import communityImg from '../../../assets/communtiy.jpeg';
import togethernessImg from '../../../assets/togetherness.jpeg';


const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
};

const About = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 100]);

  return (
    <div className="bg-background-light min-h-screen py-32 md:py-48 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-40 right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section - Asymmetrical */}
        <div className="flex flex-col lg:flex-row items-end gap-12 mb-32">
          <motion.div 
            className="lg:w-2/3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-flex items-center gap-3 text-secondary font-black tracking-[0.3em] uppercase text-xs mb-6">
              <Sparkles className="w-4 h-4" />
              Our Purpose
            </span>
            <h1 className="leading-[0.95] tracking-tighter">
              Crafting a <span className="italic text-secondary font-medium">positive</span> vision <br /> 
              of what aging can be.
            </h1>
          </motion.div>
          <motion.div 
            className="lg:w-1/3 text-gray-500 font-medium text-lg lg:pb-4 border-l-2 border-accent pl-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Every story matters. Every life is a legacy. We are the keepers of comfort and dignity.
          </motion.div>
        </div>

        {/* Overlapping Content Section 1 */}
        <section className="mb-48 relative">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-7/12 relative z-10"
              {...fadeInUp}
            >
              <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-premium border border-white">
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-10 font-medium">
                  Senior Citizen Homes are often viewed negatively, but they should instead be seen as a <span className="text-primary font-bold">supportive and positive</span> environment.
                </p>
                <p className="text-lg text-gray-500 leading-relaxed font-medium">
                  At our foundation, senior citizens are not simply looked after—they are given a <span className="text-secondary font-bold italic">welcoming community</span> where they can build friendships and share meaningful experiences. Through engaging activities, they remain active and happy.
                </p>
                <div className="mt-12 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-background-light flex items-center justify-center text-primary">
                    <Users className="w-7 h-7" />
                  </div>
                  <div className="text-sm font-black uppercase tracking-widest text-primary">A Vibrant Community</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-6/12 lg:-ml-24 mt-12 lg:mt-0"
              style={{ y: y1 }}
            >
              <div className="relative rounded-[3rem] rounded-tr-[10rem] overflow-hidden shadow-premium aspect-[4/5] lg:aspect-auto lg:h-[700px] border-[12px] border-white">
                <img 
                  src={communityImg} 
                  alt="Social bonding"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/10" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section 2 - Flipped */}
        <section className="mb-48 relative">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-6/12 order-2 lg:order-1 relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-[3rem] rounded-bl-[10rem] overflow-hidden shadow-premium aspect-[4/5] lg:aspect-auto lg:h-[700px] border-[12px] border-white">
                <img 
                  src={togethernessImg} 
                  alt="Community Living"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-secondary/10" />
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-7/12 lg:-ml-24 order-1 lg:order-2 mb-12 lg:mb-0 relative z-20"
              {...fadeInUp}
            >
              <div className="bg-primary p-12 md:p-20 rounded-[3rem] shadow-premium text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Quote className="w-32 h-32" />
                </div>
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-10 font-medium">
                  We believe that a meaningful and fulfilling life continues at every stage of age. Keeping residents active and socially connected is our highest priority.
                </p>
                <div className="h-px bg-white/20 w-20 mb-10" />
                <h3 className="text-2xl md:text-4xl font-serif font-black italic leading-tight text-accent">
                  "Our goal is joy, engagement, and a strong sense of community for every resident."
                </h3>
                <div className="mt-12 flex items-center gap-4">
                  <div className="w-10 h-1 bg-accent rounded-full" />
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">Foundation Mission</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid - Organic */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              className="lg:col-span-7 relative rounded-[4rem] overflow-hidden shadow-premium group"
              {...fadeInUp}
            >
              <img 
                src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=1200"
                alt="Care home"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-primary/5" />
            </motion.div>
            
            <motion.div 
              className="lg:col-span-5 relative"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-accent/10 p-16 rounded-[4rem] border-2 border-accent/20 text-center">
                <Sun className="w-16 h-16 text-accent mx-auto mb-8 animate-spin-slow" />
                <h3 className="text-3xl font-serif font-black mb-6 text-primary">Warmth in every corner</h3>
                <p className="text-gray-600 font-medium">We've designed our spaces to feel like home, filled with light and laughter.</p>
              </div>
            </motion.div>
        </div>

      </div>
    </div>
  );
};

export default About;
;
