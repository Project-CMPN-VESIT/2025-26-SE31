import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Heart, ShieldCheck, Coffee, Users, Star, ArrowRight, CheckCircle2, Sparkles, Sun, Flower2, MessageCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { reviewService } from '../../../services/review.service';
import homeHero from '../../../assets/home_page1.jpeg';
import communityImg from '../../../assets/communtiy.jpeg';
import togethernessImg from '../../../assets/togetherness.jpeg';
import healthImg from '../../../assets/health_monitoring.jpg';
import doctorImg from '../../../assets/weekly_doctor.jpg';
import nutritionImg from '../../../assets/nutrition_care.jpg';
import counselingImg from '../../../assets/counselling.jpg';
import homePage2 from '../../../assets/home_page2.jpg';
import activenessImg from '../../../assets/activeness.webp';


const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
};

const FloatingElement = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    animate={{
      y: [0, -15, 0],
      rotate: [0, 5, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
  >
    {children}
  </motion.div>
);

const HeroSection = () => {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 150]);
  const yText = useTransform(scrollY, [0, 1000], [0, -50]);
  const springYImage = useSpring(yImage, { stiffness: 100, damping: 30 });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background-light pt-20 lg:pt-32 pb-20">
      {/* Background Textures */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a3a34' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          <motion.div 
            className="lg:w-3/5 text-center lg:text-left z-20"
            style={{ y: yText }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              className="inline-flex items-center gap-3 py-2 px-5 rounded-full bg-white shadow-soft text-primary text-xs font-black uppercase tracking-[0.2em] mb-10 border border-primary/5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Sun className="w-4 h-4 text-accent animate-spin-slow" />
              Rooted in Kindness
            </motion.div>
            
            <h1 className="mb-8 text-primary leading-[0.95] tracking-tight">
              A place where <br />
              <span className="relative inline-block">
                <span className="relative z-10 italic font-medium text-secondary">dignity</span>
                <motion.svg 
                  className="absolute -bottom-2 left-0 w-full h-3 text-accent/30 -z-10"
                  viewBox="0 0 300 12" 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <path d="M1 10.5C35.5 4.5 125 1 299 4" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
                </motion.svg>
              </span> <br />
              finds its home.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              We've created more than just a residence; it's a vibrant community where wisdom is celebrated and every day is a gift.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <Link to="/services" className="btn-primary group !rounded-full !px-10">
                Explore Our Care <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="btn-outline !rounded-full !px-10">
                Meet Us
              </Link>
            </div>
            
            <div className="mt-16 flex items-center justify-center lg:justify-start gap-8 opacity-60">
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Resident" />
                    </div>
                  ))}
               </div>
               <p className="text-sm font-bold text-primary tracking-wide uppercase">Trusted by 500+ Families</p>
            </div>
          </motion.div>
          
          <div className="lg:w-2/5 relative">
            <motion.div 
              className="relative z-10"
              style={{ y: springYImage }}
            >
              {/* Main Image with Asymmetrical Border */}
              <div className="relative rounded-[2rem] rounded-tr-[5rem] lg:rounded-tr-[10rem] rounded-bl-[5rem] lg:rounded-bl-[10rem] overflow-hidden shadow-premium border-[8px] lg:border-[12px] border-white transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
                <img
                  className="w-full h-[400px] md:h-[550px] lg:h-[700px] object-cover"
                  src={homeHero}
                  alt="Joyful community"
                />
                <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
              </div>

              </motion.div>
            
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ActionCards = () => {
  const actions = [
    {
      title: "Admit a Senior",
      desc: "Compassionate care for your loved ones in a vibrant community.",
      icon: <Heart className="w-8 h-8" />,
      link: "/admissions",
      color: "bg-primary"
    },
    {
      title: "Become a Volunteer",
      desc: "Share your time and skills to bring joy to our residents.",
      icon: <Users className="w-8 h-8" />,
      link: "/volunteer",
      color: "bg-secondary"
    },
    {
      title: "Visit Our Home",
      desc: "Schedule a visit to meet our residents and see our facilities.",
      icon: <Flower2 className="w-8 h-8" />,
      link: "/contact",
      color: "bg-accent-dark"
    }
  ];

  return (
    <section className="relative z-40 -mt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {actions.map((action, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-[2.5rem] p-10 shadow-premium group hover:-translate-y-4 transition-all duration-500 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`w-16 h-16 ${action.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-12 transition-transform`}>
                {action.icon}
              </div>
              <h3 className="text-2xl font-serif font-black text-primary mb-4">{action.title}</h3>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">{action.desc}</p>
              <Link to={action.link} className="inline-flex items-center text-sm font-black uppercase tracking-widest text-primary group-hover:text-secondary transition-colors">
                Get Started <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SectionHeading = ({ badge, title, center = true }) => (
  <motion.div 
    className={`mb-20 ${center ? 'text-center' : 'text-left'}`}
    {...fadeInUp}
  >
    <span className="inline-block text-secondary font-black tracking-[0.3em] uppercase text-xs mb-4">{badge}</span>
    <h2 className="text-primary max-w-2xl mx-auto lg:mx-0">{title}</h2>
    <div className={`h-1.5 w-20 bg-accent mt-6 rounded-full ${center ? 'mx-auto' : ''}`} />
  </motion.div>
);

const AboutPreview = () => (
  <section className="py-40 bg-white relative">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-24">
        <div className="lg:w-1/2 order-2 lg:order-1">
          <SectionHeading 
            badge="Our Soul" 
            title="Beyond just care, we provide a sense of belonging."
            center={false}
          />
          <p className="text-2xl text-gray-600 leading-relaxed mb-12 font-medium italic font-serif">
            "Aging is not a loss of youth, but a new stage of opportunity and strength. We are here to ensure that strength is nurtured."
          </p>
          <div className="space-y-6 mb-12">
            {[
              { text: 'A family-first approach to community living.', icon: <Users className="w-5 h-5" /> },
              { text: 'Holistic wellness for mind, body, and spirit.', icon: <Sparkles className="w-5 h-5" /> }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-background-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <span className="text-lg font-bold text-primary/80">{item.text}</span>
              </div>
            ))}
          </div>
          <Link to="/about" className="group text-secondary font-black text-lg hover:text-secondary-dark inline-flex items-center gap-3 transition-colors tracking-widest uppercase">
            Discover Our Story <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        
        <div className="lg:w-1/2 order-1 lg:order-2 relative">
          <div className="relative rounded-[4rem] overflow-hidden shadow-premium group">
            <img 
              src={homePage2} 
              className="w-full h-[600px] object-cover group-hover:scale-110 transition-transform duration-[2s]"
              alt="Care environment"
            />
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-700" />
          </div>
          {/* Decorative Offset Box */}
          <div className="absolute -top-6 -right-6 w-full h-full border-2 border-accent/30 rounded-[4rem] -z-10" />
        </div>
      </div>
    </div>
  </section>
);

const ServicesPreview = () => (
  <section className="py-40 bg-background-light relative overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute top-0 right-0 w-1/3 h-full bg-white/50 -skew-x-12 transform translate-x-1/2 -z-10" />
    
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <SectionHeading badge="What We Offer" title="Holistic care centered around the individual." />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          { title: 'Health Monitoring', icon: <Heart className="w-8 h-8" />, src: healthImg, color: 'text-secondary' },
          { title: 'Weekly Doctor', icon: <ShieldCheck className="w-8 h-8" />, src: doctorImg, color: 'text-primary' },
          { title: 'Nutrition Care', icon: <Coffee className="w-8 h-8" />, src: nutritionImg, color: 'text-accent-dark' },
          { title: 'Counseling', icon: <Brain className="w-8 h-8" />, src: counselingImg, color: 'text-indigo-500' }
        ].map((s, i) => (
          <motion.div 
            key={i} 
            className="card group !rounded-[2.5rem] bg-white border-none shadow-soft"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
          >
            <div className="relative h-64 overflow-hidden">
              <img src={s.src} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-700" />
            </div>
            <div className="p-10 relative">
              <h3 className="text-2xl mb-4 text-primary leading-tight font-serif">
                <span className="text-accent-dark/20 font-black mr-2">0{i + 1}</span>
                {s.title}
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed">{s.description || "Tailored support focused on maintaining your unique health journey with dignity."}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ActivitiesPreview = () => (
  <section className="py-40 bg-white overflow-hidden relative">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-32">
        <div className="lg:w-1/2 relative">
          <div className="relative z-10 rounded-[3rem] rounded-tl-[10rem] overflow-hidden shadow-premium border-[12px] border-background-light">
            <img 
              src={activenessImg} 
              alt="Community Life" 
              className="w-full h-[650px] object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10" />
        </div>
        
        <div className="lg:w-1/2">
           <SectionHeading badge="Daily Joys" title="An active mind is a happy one." center={false} />
           <p className="text-xl text-gray-600 mb-12 leading-relaxed font-medium">
             We believe in keeping our residents engaged through activities that stimulate the mind and comfort the soul.
           </p>
           <div className="space-y-8 mb-12">
             {[
               { title: 'Movement & Grace', desc: 'Gentle chair yoga and morning walks.' },
               { title: 'Wisdom Circles', desc: 'Group readings and storytelling sessions.' },
               { title: 'Creative Hearts', desc: 'Arts, music, and community celebrations.' }
             ].map((item, i) => (
               <div key={i} className="flex gap-6 items-start group">
                 <div className="w-14 h-14 bg-background-light rounded-2xl flex items-center justify-center shrink-0 text-primary group-hover:scale-110 transition-transform shadow-soft">
                    <CheckCircle2 className="w-7 h-7" />
                 </div>
                 <div>
                   <h4 className="text-lg font-black text-primary uppercase tracking-wider mb-2">{item.title}</h4>
                   <p className="text-gray-500 font-medium">{item.desc}</p>
                 </div>
               </div>
             ))}
           </div>
           <Link to="/activities" className="btn-primary !rounded-full !px-12 group">
              View All Activities <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </div>
    </div>
  </section>
);

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reviewService.getAllReviews()
      .then(res => setReviews(res.data || []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  const sliderSettings = {
    dots: true, infinite: reviews.length > 2, speed: 1000,
    slidesToShow: 3, slidesToScroll: 1, autoplay: true, autoplaySpeed: 6000,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  if (loading || reviews.length === 0) return null;

  return (
    <section className="py-40 bg-background-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading badge="Kind Words" title="The impact we've made, in their own words." />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.slice(0, 3).map((review) => (
            <div key={review._id || Math.random()} className="outline-none h-full">
              <div className="bg-white h-full p-10 rounded-[3rem] border border-white flex flex-col shadow-soft hover:shadow-premium transition-all duration-700 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 -z-10 group-hover:bg-primary/10 transition-colors" />
                <div className="flex gap-1 mb-8 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < (review.rating || 5) ? 'fill-current' : 'text-gray-100'}`} />
                  ))}
                </div>
                <p className="text-gray-600 text-lg italic mb-10 leading-relaxed font-serif">"{review.comment}"</p>
                <div className="mt-auto flex items-center gap-5">
                  <div className="w-14 h-14 bg-primary text-white rounded-[1.2rem] flex items-center justify-center font-black text-xl shadow-soft">
                    {(review.user?.name || 'F')[0]}
                  </div>
                  <div>
                    <div className="font-black text-primary uppercase tracking-widest text-xs">{review.user?.name || 'Family Member'}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {reviews.length > 3 && (
          <div className="text-center">
            <Link to="/reviews" className="inline-flex items-center gap-3 px-10 py-5 bg-white border-2 border-primary/10 rounded-full font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-soft">
              View All Reviews <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

const Brain = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.16z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.16z" />
  </svg>
);

const ReviewForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Please login to share your experience');
    
    setSubmitting(true);
    try {
      await reviewService.createReview(formData);
      toast.success('Thank you! Your review has been shared.');
      setFormData({ rating: 5, comment: '' });
      setShowForm(false);
    } catch (error) {
      toast.error('Failed to post review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenForm = () => {
    if (!user) {
      toast.error('Please login to share your experience');
      // optional: navigate('/login') after a delay
      return;
    }
    setShowForm(true);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {!showForm ? (
          <div className="text-center">
            <button 
              onClick={handleOpenForm}
              className="group inline-flex items-center gap-4 py-5 px-12 bg-primary text-white rounded-full font-black uppercase tracking-widest hover:bg-secondary transition-all shadow-premium"
            >
              Share Your Experience <Star className="w-5 h-5 text-accent fill-current" />
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-background-light rounded-[3rem] p-12 md:p-16 border border-primary/10 shadow-premium"
          >
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-serif font-black text-primary">Write a <span className="text-secondary italic">Review</span></h3>
              <button onClick={() => setShowForm(false)} className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-secondary">Cancel</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 ml-2">Rating</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(star => (
                    <button 
                      key={star} 
                      type="button" 
                      onClick={() => setFormData({...formData, rating: star})}
                      className="transition-transform hover:scale-110"
                    >
                      <Star className={`w-10 h-10 ${star <= formData.rating ? 'fill-accent text-accent' : 'text-gray-200'}`} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 ml-2">Your Experience</label>
                <textarea 
                  required
                  rows="4"
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  className="w-full px-8 py-6 bg-white rounded-3xl border-2 border-gray-100 focus:border-primary focus:outline-none font-medium text-lg resize-none shadow-soft"
                  placeholder="Enter experience"
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-premium hover:bg-secondary transition-all disabled:opacity-50"
              >
                {submitting ? 'Sharing...' : 'Post Review'}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-background-light">
      <HeroSection />
      <ActionCards />
      
      {/* Spacer to push content below cards */}
      <div className="h-32 bg-white" style={{ borderRadius: '100% 100% 0 0 / 100% 100% 0 0', marginTop: '5rem' }} />
      
      <AboutPreview />
      <ServicesPreview />
      <ActivitiesPreview />
      
      {/* Large Statement Section */}
      <motion.section 
        className="w-full relative h-[70vh] md:h-[90vh] overflow-hidden flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <img 
           src={togethernessImg}
           alt="Parallax background"
           className="absolute inset-0 w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[4s]"
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center px-6">
          <motion.h2 
            className="text-white text-4xl md:text-8xl font-serif font-black leading-tight max-w-6xl mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            We are <span className="text-accent italic">stewards</span> of their golden <span className="text-secondary italic">memories</span>.
          </motion.h2>
        </div>
      </motion.section>
      
      <ReviewsSection />
      <ReviewForm />
    </div>
  );
};

export default Home;
