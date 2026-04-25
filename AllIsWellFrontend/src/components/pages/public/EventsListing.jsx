import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Calendar, Clock, SearchX, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { eventService } from '../../../services/event.service';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const EventSkeleton = () => (
  <div className="card animate-pulse bg-white p-0">
    <div className="h-72 bg-gray-200"></div>
    <div className="p-8 space-y-4">
      <div className="h-8 bg-gray-200 rounded-xl w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="pt-6 border-t border-gray-100 flex gap-4">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  </div>
);

const EventsListing = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAllEvents();
        setEvents(Array.isArray(data) ? data : (data?.data || data?.events || []));
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)"
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-background-light min-h-screen py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-secondary font-black tracking-[0.2em] uppercase text-sm mb-4 block">Community Life</span>
          <h1 className="mb-6 leading-tight">Our <span className="text-secondary italic">Events</span> & Gatherings</h1>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            Join us in our activities designed to bring joy, health, and a deep sense of togetherness to our residents.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <EventSkeleton key={i} />
            ))}
          </div>
        ) : events.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            initial="initial"
            animate="whileInView"
            variants={{
              initial: { opacity: 0 },
              whileInView: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            {events.map((event) => (
              <motion.div 
                key={event._id || event.id} 
                className="card flex flex-col h-full bg-white group"
                variants={fadeInUp}
              >
                <div className="h-72 relative overflow-hidden bg-gray-100">
                  {event.images && event.images.length > 0 ? (
                    event.images.length === 1 ? (
                      <img 
                        src={event.images[0].url || event.images[0]} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      />
                    ) : (
                      <Slider {...sliderSettings} className="h-full events-slider">
                        {event.images.map((img, idx) => (
                          <div key={idx} className="h-72 outline-none">
                            <img 
                              src={img.url || img} 
                              alt={`${event.title} slide ${idx + 1}`} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        ))}
                      </Slider>
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-background-light">
                      <span className="text-xs font-black uppercase tracking-widest">No Image</span>
                    </div>
                  )}
                </div>
                
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-primary mb-4 line-clamp-2 hover:text-secondary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-500 mb-8 flex-grow line-clamp-3 font-medium leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="mt-auto space-y-4 pt-8 border-t border-gray-100">
                    <div className="flex items-center text-gray-500 font-bold text-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center mr-4 shrink-0">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <span className="truncate">{formatDate(event.startDate)}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center text-gray-500 font-bold text-sm">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mr-4 shrink-0">
                          <MapPin className="w-4 h-4 text-accent-dark" />
                        </div>
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="bg-white rounded-[4rem] shadow-premium border border-white p-20 text-center"
            {...fadeInUp}
          >
            <SearchX className="mx-auto h-20 w-20 text-accent mb-8" />
            <h3 className="text-3xl font-black text-primary mb-4 font-serif">No Events Scheduled</h3>
            <p className="text-gray-500 text-xl font-medium">We don't have any events planned at the moment. Please check back later!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EventsListing;



// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import { Calendar, Clock, SearchX } from "lucide-react";
// import { eventService } from "../../../services/event.service";

// const EventSkeleton = () => (
//   <div className="animate-pulse flex flex-col h-full bg-white rounded-lg overflow-hidden shadow">
//     <div className="h-64 bg-gray-200"></div>
//     <div className="p-6 flex flex-col flex-grow">
//       <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
//       <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
//       <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
//       <div className="mt-auto space-y-3">
//         <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//         <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//       </div>
//     </div>
//   </div>
// );

// const EventsListing = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//  useEffect(() => {
//   const fetchEvents = async () => {
//     try {
//       const data = await eventService.getAllEvents();

//       console.log("EVENT DATA:", data);

//       setEvents(Array.isArray(data) ? data : data.events || []);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       setEvents([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchEvents();
// }, []);

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       weekday: "short",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen py-16">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="text-center mb-16">
//           <h1 className="text-4xl font-bold">Community Events</h1>
//           <p className="mt-4 text-gray-600">
//             Join us in our upcoming activities.
//           </p>
//         </div>

//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[1, 2, 3, 4, 5, 6].map((i) => (
//               <EventSkeleton key={i} />
//             ))}
//           </div>
//         ) : events.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {events.map((event) => (
//               <div
//                 key={event._id}
//                 className="bg-white rounded-lg shadow overflow-hidden flex flex-col"
//               >
//                 {/* IMAGE */}
//                 <div className="h-64 bg-gray-100">
//                   {event.images?.length > 1 ? (
//                     <Slider {...sliderSettings}>
//                       {event.images.map((img, i) => (
//                         <img
//                           key={i}
//                           src={img.url}
//                           alt={event.title}
//                           className="h-64 w-full object-cover"
//                         />
//                       ))}
//                     </Slider>
//                   ) : event.images?.length === 1 ? (
//                     <img
//                       src={event.images[0].url}
//                       alt={event.title}
//                       className="h-64 w-full object-cover"
//                     />
//                   ) : (
//                     <div className="h-64 flex items-center justify-center text-gray-400">
//                       No Image
//                     </div>
//                   )}
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-6 flex flex-col flex-grow">
//                   <h3 className="text-xl font-bold mb-2">{event.title}</h3>

//                   <p className="text-gray-600 flex-grow">
//                     {event.description}
//                   </p>

//                   <div className="mt-4 border-t pt-4 text-sm text-gray-500 space-y-2">
//                     <div className="flex items-center gap-2">
//                       <Calendar size={16} />
//                       {formatDate(event.startDate)}
//                     </div>

//                     {event.endDate && (
//                       <div className="flex items-center gap-2">
//                         <Clock size={16} />
//                         Until {formatDate(event.endDate)}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <SearchX className="mx-auto text-gray-300 mb-4" size={50} />
//             <h2 className="text-xl font-bold">No Events Found</h2>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventsListing;