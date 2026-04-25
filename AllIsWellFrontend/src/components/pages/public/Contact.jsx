import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactService } from '../../../services/contact.service';
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import contactHero1 from '../../../assets/contact_us1.jpg';
import contactHero2 from '../../../assets/contact_us2.jpg';


const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const Contact = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!user) {
        toast.error("Please login to send a message.");
        return;
      }
      await contactService.submitEnquiry(data);
      toast.success("Message sent successfully! We will get back to you soon.");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message. Please try again or contact us via WhatsApp.");
    }
  };

  return (
    <div className="bg-background-light min-h-screen py-24 md:py-32 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-secondary font-black tracking-[0.2em] uppercase text-sm mb-4 block">Get in Touch</span>
          <h1 className="mb-6">We're Here to <span className="text-secondary italic">Listen</span></h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 font-medium">
            Whether you want to volunteer, donate, or admit a loved one, our doors and hearts are always open.
          </p>
          
          {/* Top Images Row */}
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
             <motion.div 
               className="rounded-[2.5rem] overflow-hidden shadow-premium border-8 border-white group"
               {...fadeInUp}
             >
               <img 
                 src={contactHero1} 
                 alt="Caring Community" 
                 className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-1000" 
               />
             </motion.div>
             <motion.div 
               className="rounded-[2.5rem] overflow-hidden shadow-premium border-8 border-white group"
               {...fadeInUp}
               transition={{ delay: 0.2 }}
             >
               <img 
                 src={contactHero2} 
                 alt="Friendly Environment" 
                 className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-1000" 
               />
             </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-[4rem] shadow-premium overflow-hidden mt-16 border border-white"
          {...fadeInUp}
        >
          
          {/* Contact Information & Map */}
          <div className="p-12 md:p-16 lg:p-20 bg-primary text-background-light flex flex-col justify-between relative">
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-12 font-serif">NGO Information</h2>
              <div className="space-y-10">
                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mr-6 shrink-0 border border-white/20 group-hover:bg-white/20 transition-colors">
                     <MapPin className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest text-accent/80 mb-2">Our Location</h4>
                    <p className="text-white text-xl font-medium leading-relaxed">Sector 19, Ulwe<br/>Navi Mumbai, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mr-6 shrink-0 border border-white/20 group-hover:bg-white/20 transition-colors">
                     <Phone className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest text-accent/80 mb-2">Phone Number</h4>
                    <p className="text-white text-xl font-medium leading-relaxed">+91 91672 70994</p>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mr-6 shrink-0 border border-white/20 group-hover:bg-white/20 transition-colors">
                     <Mail className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest text-accent/80 mb-2">Email Address</h4>
                    <p className="text-white text-xl font-medium leading-relaxed break-all">alliswellfoundation.india@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 rounded-[2rem] overflow-hidden shadow-premium h-72 border-4 border-white/10 relative z-10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30175.727546684746!2d72.99725835!3d18.9663785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c390cb33fb75%3A0x64e451b69be5eed3!2sUlwe%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location of All Is Well Foundation"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-12 md:p-16 lg:p-20 bg-white">
            <div className="mb-12">
               <h3 className="text-3xl font-black text-primary mb-4 font-serif">Send us a message</h3>
            </div>
            {!user && (
              <div className="mb-8 p-6 bg-secondary/5 rounded-3xl border border-secondary/10 flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary text-white rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-primary">
                  Please <Link to="/login" className="text-secondary underline">login</Link> to submit this form.
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Your Full Name</label>
                  <input
                    id="name"
                    type="text"
                    className={`block w-full px-6 py-4 rounded-2xl border-2 ${errors.name ? 'border-secondary/30 focus:ring-secondary' : 'border-gray-100 focus:ring-primary focus:border-primary'} shadow-soft text-gray-900 focus:outline-none bg-background-light/50 hover:bg-white transition-all font-medium`}
                    placeholder="Enter name"
                    {...register('name', { required: "Name is required" })}
                  />
                  {errors.name && <p className="mt-2 text-sm text-secondary font-bold ml-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    className={`block w-full px-6 py-4 rounded-2xl border-2 ${errors.email ? 'border-secondary/30 focus:ring-secondary' : 'border-gray-100 focus:ring-primary focus:border-primary'} shadow-soft text-gray-900 focus:outline-none bg-background-light/50 hover:bg-white transition-all font-medium`}
                    placeholder="Enter email"
                    {...register('email', { required: "Email is required" })}
                  />
                  {errors.email && <p className="mt-2 text-sm text-secondary font-bold ml-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    className={`block w-full px-6 py-4 rounded-2xl border-2 ${errors.phone ? 'border-secondary/30 focus:ring-secondary' : 'border-gray-100 focus:ring-primary focus:border-primary'} shadow-soft text-gray-900 focus:outline-none bg-background-light/50 hover:bg-white transition-all font-medium`}
                    placeholder="Enter phone no"
                    {...register('phone', { required: "Phone number is required" })}
                  />
                  {errors.phone && <p className="mt-2 text-sm text-secondary font-bold ml-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label htmlFor="enquiryType" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Enquiry Type</label>
                  <select
                    id="enquiryType"
                    className={`block w-full px-6 py-4 rounded-2xl border-2 ${errors.enquiryType ? 'border-secondary/30 focus:ring-secondary' : 'border-gray-100 focus:ring-primary focus:border-primary'} shadow-soft text-gray-900 focus:outline-none bg-background-light/50 hover:bg-white transition-all font-medium appearance-none`}
                    {...register('enquiryType', { required: "Please select an enquiry type" })}
                  >
                    <option value="General">General Enquiry</option>
                    <option value="Admission">Admission Enquiry</option>
                    <option value="Donation">Donation Enquiry</option>
                    <option value="Volunteer">Volunteer Application</option>
                  </select>
                  {errors.enquiryType && <p className="mt-2 text-sm text-secondary font-bold ml-1">{errors.enquiryType.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Your Message</label>
                <textarea
                  id="message"
                  rows="4"
                  className={`block w-full px-6 py-4 rounded-2xl border-2 ${errors.message ? 'border-secondary/30 focus:ring-secondary' : 'border-gray-100 focus:ring-primary focus:border-primary'} shadow-soft text-gray-900 focus:outline-none resize-none bg-background-light/50 hover:bg-white transition-all font-medium`}
                  placeholder="Enter message"
                  {...register('message', { required: "Message is required" })}
                ></textarea>
                {errors.message && <p className="mt-2 text-sm text-secondary font-bold ml-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-5 text-lg font-black uppercase tracking-widest shadow-premium disabled:opacity-70 mt-4"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Send className="w-5 h-5 mr-3" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      <a 
        href="https://wa.me/919167270994?text=Hello%20I%20need%20help"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 bg-[#25D366] text-white p-5 rounded-full shadow-premium hover:scale-110 hover:-translate-y-2 transition-all z-50 flex items-center justify-center group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>
    </div>
  );
};

export default Contact;
