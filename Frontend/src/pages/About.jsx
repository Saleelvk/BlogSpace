import React from 'react';
import { ArrowRight, MapPin, Mail, Phone, Clock, Calendar, FileText, Camera, Users } from 'lucide-react';
import founder  from '../assets/images/profile.jpg'
import founder1  from '../assets/images//images.jpeg'
import founder2  from '../assets/images/Profile-picture-created-with-ai.jpeg'
import founder3  from '../assets/images/AI-Profile-Picture.jpg'
import Email from '../Components/Email';
const AlternativeAboutPage = () => {
  return (
    <div className="bg-white  text-black">
    
      <section className="relative h-96 bg-black">
        <img 
          src="/api/placeholder/1600/800" 
          alt="Writing desk with laptop and coffee" 
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Our Journey</h1>
            <p className="text-xl text-gray-200 max-w-2xl">Sharing stories and insights since 2022</p>
          </div>
        </div>
      </section>
      
    
      <section className="py-16 px-4 mx-auto bg-gray-200 w-full">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-black  mb-8">Our Mission</h2>
          <p className="text-xl leading-relaxed text-black  italic mb-8">
            "To inspire creativity, foster critical thinking, and provide valuable insights 
            through authentic storytelling and thoughtful analysis."
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
        </div>
      </section>
      
    
      

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-16">Meet Our Team</h2>
          
        
          <div className="mb-16 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <div className="relative">
                <img 
                  src={founder} 
                  alt="Sarah Chen - Founder" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
               
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-black mb-4">Sarah Chen</h3>
              <p className="text-gray-600 dark:text-gray-700 text-lg italic mb-6">
                "I believe that stories have the power to change perspectives and bring people together."
              </p>
              <p className="text-gray-700 dark:text-gray-700 mb-6 leading-relaxed">
                Sarah is a former travel journalist with over a decade of experience exploring over 40 countries. 
                What started as a personal blog to document her adventures quickly grew into a platform for sharing 
                diverse stories and perspectives from around the world. When not writing or editing, Sarah can be 
                found hiking with her camera, experimenting with new recipes, or mentoring aspiring travel writers.
              </p>
            
            </div>
          </div>
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={founder2} 
                  alt="Team Member" 
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex space-x-2">
                      <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </a>
                      <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white">Miguel Sanchez</h3>
                <p className="text-indigo-500 font-medium mb-3">Travel & Culture Editor</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Anthropologist and travel writer with a focus on indigenous cultures and preservation efforts.
                </p>
              </div>
            </div>
            
      
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={founder1}  
                  alt="Team Member" 
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex space-x-2">
                      <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </a>
                      <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white">Amara Okafor</h3>
                <p className="text-indigo-500 font-medium mb-3">Food & Sustainability Editor</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Culinary expert exploring the intersection of traditional cuisines and sustainable practices.
                </p>
              </div>
            </div>
            
 
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={founder3}  
                  alt="Team Member" 
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex space-x-2">
                      <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </a>
                      <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white">Liam Zhang</h3>
                <p className="text-indigo-500 font-medium mb-3">Head of Visual Content</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Award-winning photographer and filmmaker specializing in environmental storytelling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <section className="py-16 bg-gray-900 text-white mt-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-indigo-500 mb-2">100K+</div>
              <p className="text-gray-300">Monthly Readers</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-indigo-500 mb-2">40+</div>
              <p className="text-gray-300">Countries Covered</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-indigo-500 mb-2">500+</div>
              <p className="text-gray-300">Published Stories</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-indigo-500 mb-2">12</div>
              <p className="text-gray-300">Team Members</p>
            </div>
          </div>
        </div>
      </section>
      
   <Email/>
    </div>
  );
};

export default AlternativeAboutPage;
