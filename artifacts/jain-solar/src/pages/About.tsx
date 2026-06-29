import React, { useEffect } from "react";
import { Shield, Target, Users, Zap, CheckCircle2 } from "lucide-react";

export default function About() {
  useEffect(() => {
    document.title = "About Us | Jain Communications";
  }, []);

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering Punjab with Clean Energy</h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Jain Communications is Nakodar's most trusted name in solar energy. We believe in building a sustainable future while delivering exceptional value to our customers.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img src="/src/assets/images/project-ind-1.png" alt="Our Team at Work" className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-8">
                <p>
                  Started in Nakodar, Jain Communications began with a simple mission: to provide the highest quality technical infrastructure to our community. As the world evolved, so did we.
                </p>
                <p>
                  Today, we are at the forefront of the renewable energy transition in Punjab. We specialize in end-to-end solar solutions for residential, commercial, and industrial clients. From the initial site survey to navigating government subsidies and final installation, we handle everything.
                </p>
                <p>
                  We don't just install solar panels; we engineer power plants that maximize yield and longevity. Our commitment to using Tier-1 equipment and our rigorous installation standards set us apart.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                  <span className="font-semibold text-primary">Certified Installers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                  <span className="font-semibold text-primary">MNRE Approved</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                  <span className="font-semibold text-primary">Local Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                  <span className="font-semibold text-primary">Turnkey Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">These principles guide every project we undertake and every customer we serve.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Uncompromising Quality", desc: "We never cut corners. We use only Tier-1 panels and robust mounting structures designed to last 25+ years." },
              { icon: Target, title: "Customer Centric", desc: "Your ROI is our priority. We design systems optimized for your specific consumption patterns and roof profile." },
              { icon: Zap, title: "Innovation", desc: "We stay updated with the latest in solar technology, from micro-inverters to smart monitoring systems." }
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary/5 mx-auto rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
