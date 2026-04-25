import React from 'react';
import { Heart, Coffee, ShieldPlus, Shirt } from 'lucide-react';

const DonationCategory = ({ icon, title, description, benefits }) => (
  <div className="card p-8 border border-gray-100 flex flex-col h-full hover:border-primary/30 transition-colors group">
    <div className="bg-primary/5 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 mb-6 flex-grow text-lg">{description}</p>
    
    <div className="mb-8">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Impact Breakdown</h4>
      <ul className="space-y-2">
        {benefits.map((benefit, i) => (
          <li key={i} className="flex items-start">
            <Heart className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
    
    <a 
      href="https://all-is-well-foundation.danamojo.org/" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="btn-primary w-full text-lg shadow-md hover:shadow-lg mt-auto text-center block py-3 border border-transparent font-medium rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors"
    >
      Donate Now
    </a>
  </div>
);

const Donation = () => {
  const categories = [
    {
      title: "Food Donation",
      description: "Help us provide nutritious, dietitian-approved meals to our elders three times a day. Your donation ensures nobody goes to bed hungry.",
      icon: <Coffee className="w-8 h-8 text-orange-500" />,
      benefits: [
        "Provides 3 daily meals to one elder for a month",
        "Includes morning and evening healthy snacks",
        "Covers special dietary requirements for diabetics"
      ]
    },
    {
      title: "Healthcare Support",
      description: "Support critical medical needs. We provide continuous monitoring, doctor visits, and emergency medical funds for our residents.",
      icon: <ShieldPlus className="w-8 h-8 text-red-500" />,
      benefits: [
        "Funds monthly doctor check-ups",
        "Stocks essential daily medicines",
        "Contributes to the emergency medical vault"
      ]
    },
    {
      title: "Clothing & Essentials",
      description: "Provide dignified clothing, winter wear, and daily living essentials such as toiletries and walking aids.",
      icon: <Shirt className="w-8 h-8 text-blue-500" />,
      benefits: [
        "New comfortable clothing for every season",
        "Warm blankets and sweaters for winter",
        "Daily hygiene kits and supplies"
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-green-50 text-secondary-dark text-sm font-semibold tracking-wide mb-4">
            Make a Real Difference
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight mb-6">Support Our Mission</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            All Is Well Foundation operates on the kindness of donors like you. 100% of your contributions go directly toward improving the quality of life for our elders. 
            Choose a category where you'd like to make an impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <DonationCategory key={index} {...cat} />
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">100% Transparency Promise</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-6">
            We believe in total transparency. Every rupee you donate is tracked, and we provide monthly reports on how funds are utilized. You are always welcome to visit our facility in Ulwe to see the impact of your support firsthand.
          </p>
          <p className="text-sm text-gray-400">
            For large corporate donations or CSR initiatives, please <a href="/contact" className="text-primary hover:underline">contact us</a> directly.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Donation;
