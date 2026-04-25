import React from 'react';
import { Sparkles, Footprints, BookOpen, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import yogaImg from '../../../assets/chair_yoga.avif';
import walkingImg from '../../../assets/walking.jpg';
import readingImg from '../../../assets/reading.jpg';
import gamesImg from '../../../assets/boardGames.jpg';
import activenessImg from '../../../assets/activeness.webp';
import communityImg from '../../../assets/communtiy.jpeg';
import togethernessImg from '../../../assets/togetherness.jpeg';
import holiImg from '../../../assets/holi_event.jpg';


const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const ACTIVITIES = [
  {
    title: 'Chair Yoga',
    description: 'Gentle stretching and breathing exercises for flexibility, circulation, balance, relaxation, and mindfulness.',
    image: yogaImg,

    gallery: [
      yogaImg,
      activenessImg,
      communityImg
    ],
    icon: <Sparkles className="w-8 h-8" />,
    color: 'text-primary'
  },
  {
    title: 'Walking Club',
    description: 'Regular group walks for exercise, fresh air, conversations, and stronger social connections.',
    image: walkingImg,

    gallery: [
      walkingImg,
      togethernessImg,
      communityImg
    ],
    icon: <Footprints className="w-8 h-8" />,
    color: 'text-secondary'
  },
  {
    title: 'Reading Circle',
    description: 'Books, newspapers, stories, and meaningful group discussions to keep the mind active.',
    image: readingImg,

    gallery: [
      readingImg,
      activenessImg,
      togethernessImg
    ],
    icon: <BookOpen className="w-8 h-8" />,
    color: 'text-accent-dark'
  },
  {
    title: 'Community Games',
    description: 'Board games, puzzles, and interactive sessions that create connection and laughter.',
    image: gamesImg,

    gallery: [
      gamesImg,
      holiImg,
      communityImg
    ],
    icon: <HeartHandshake className="w-8 h-8" />,
    color: 'text-secondary'
  }
];

const Activities = () => {
  return (
    <div className="bg-background-light min-h-screen py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-24 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-secondary font-black tracking-[0.2em] uppercase text-sm mb-4 block">Active Living</span>
          <h1 className="mb-6 leading-tight">Nurturing the <span className="text-secondary italic">Spirit</span></h1>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            At All Is Well Foundation, we believe staying active physically and mentally is essential for a vibrant and joyful life.
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {ACTIVITIES.map((activity, index) => (
            <motion.div 
              key={index} 
              className="card group bg-white flex flex-col"
              {...fadeInUp}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <div className="h-72 relative overflow-hidden">
                <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-60" />
                <div className="absolute top-6 left-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-premium border border-white/50 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                   <div className={activity.color}>{activity.icon}</div>
                </div>
                <div className="absolute bottom-6 right-8 text-white font-serif font-black text-6xl opacity-20">0{index + 1}</div>
              </div>
              <div className="p-10 md:p-12 flex flex-col flex-grow">
                <h3 className="text-3xl font-serif font-black text-primary mb-6">{activity.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed font-medium mb-10 flex-grow">{activity.description}</p>
                
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Activities;
