import React, { useEffect } from "react";
import { Link } from "wouter";
import ContactForm from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BUSINESS_DETAILS } from "@/lib/constants";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us | Jain Communications Nakodar";
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-24">
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Ready to switch to solar? Have questions about subsidies? Our team is here to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary mb-1">Call Us</div>
                    <a href={`tel:+91${BUSINESS_DETAILS.phone1}`} className="block text-muted-foreground hover:text-secondary">+91 {BUSINESS_DETAILS.phone1}</a>
                    <a href={`tel:+91${BUSINESS_DETAILS.phone2}`} className="block text-muted-foreground hover:text-secondary">+91 {BUSINESS_DETAILS.phone2}</a>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary mb-1">Email Us</div>
                    <a href={`mailto:${BUSINESS_DETAILS.email}`} className="text-muted-foreground hover:text-secondary">{BUSINESS_DETAILS.email}</a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary mb-1">Visit Office</div>
                    <div className="text-muted-foreground">{BUSINESS_DETAILS.address}</div>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary mb-1">Business Hours</div>
                    <div className="text-muted-foreground">Mon - Sat: 9:00 AM - 6:00 PM<br/>Sunday: Closed</div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 overflow-hidden relative">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                 <div className="text-center p-6 bg-white/90 m-4 rounded-xl shadow backdrop-blur-sm z-10">
                   <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                   <h4 className="font-bold text-lg text-primary">Jain Communications</h4>
                   <p className="text-sm text-muted-foreground mb-4">{BUSINESS_DETAILS.address}</p>
                   <a href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_DETAILS.address)}`} target="_blank" rel="noreferrer" className="text-secondary font-medium hover:underline text-sm">
                     Open in Google Maps
                   </a>
                 </div>
              </div>
              <div className="h-64 relative z-0"></div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
              <h2 className="text-3xl font-bold text-primary mb-2">Request a Free Site Survey</h2>
              <p className="text-muted-foreground mb-8">Fill out the form below and our solar experts will contact you to discuss your requirements and schedule a visit.</p>
              
              <ContactForm defaultType="survey" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
