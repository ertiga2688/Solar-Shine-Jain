import React, { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Zap, Award, BarChart3, ClipboardCheck, SunMedium, Plug, Building2, Wrench } from "lucide-react";
import SavingsCalculator from "@/components/calculator/SavingsCalculator";
import ContactForm from "@/components/forms/ContactForm";
import { BUSINESS_DETAILS } from "@/lib/constants";

const trustIndicators = [
  { icon: ClipboardCheck, label: "Free Site Survey" },
  { icon: SunMedium, label: "PM Surya Ghar Assistance" },
  { icon: Award, label: "MNRE-Compliant Products" },
  { icon: Plug, label: "Net Metering Assistance" },
  { icon: Building2, label: "Residential / Commercial / Industrial" },
  { icon: Wrench, label: "After-Sales Support" },
];

export default function Home() {
  useEffect(() => {
    document.title = "Solar Panels Nakodar | Jain Communications";
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1a3250] to-[#0f1f33] opacity-90 z-10" />
          <img
            src="/hero-solar.jpg"
            alt="Rooftop Solar Installation by Jain Communications"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-20 pt-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-sm font-medium tracking-wide uppercase">Solar Solutions in Punjab</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Switch to Solar & Save Up to <span className="text-secondary">90%</span> on Electricity Bills.
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Premium rooftop solar installations, government subsidy assistance, and reliable energy for your home and business.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/contact" data-testid="link-hero-quote" className="inline-flex h-14 items-center justify-center rounded-lg bg-secondary px-8 font-bold text-secondary-foreground transition-all hover:bg-secondary/90 hover:scale-105 shadow-xl shadow-secondary/20 text-lg">
                Get Free Quote <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a href={BUSINESS_DETAILS.whatsappLink} target="_blank" rel="noopener noreferrer" data-testid="link-hero-whatsapp" className="inline-flex h-14 items-center justify-center rounded-lg bg-white/10 border border-white/20 px-8 font-bold text-white transition-all hover:bg-white/20 backdrop-blur-md text-lg">
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Bar */}
      <section className="bg-white border-b border-gray-100 relative z-30 -mt-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trustIndicators.map(({ icon: Icon, label }, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center text-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <span className="text-sm font-semibold text-primary leading-tight">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">Calculate Your Savings</h2>
              <p className="text-lg text-muted-foreground">Find out how much you can save with a solar installation tailored to your needs.</p>
            </div>
            <SavingsCalculator />
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">Why Choose Jain Communications?</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                From the initial site survey to navigating government subsidies and final installation, we handle everything — so you get clean energy without the paperwork headache.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Free Site Survey", desc: "We visit your property, assess your roof and consumption, and give you a detailed, no-obligation proposal." },
                  { title: "PM Surya Ghar Assistance", desc: "We handle all documentation and portal submissions for the government subsidy scheme on your behalf." },
                  { title: "MNRE-Compliant Products", desc: "We use only Ministry of New and Renewable Energy approved panels, inverters, and mounting systems." },
                  { title: "Net Metering Assistance", desc: "We liaise with your electricity board to get net metering approved so you earn credits for surplus energy." },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img src="/src/assets/images/project-res-2.png" alt="Solar installation by Jain Communications" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">Up to ₹78,000</div>
                    <div className="text-sm font-medium text-muted-foreground">Govt Subsidy Available</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">We assist you through the entire PM Surya Ghar Yojana process — at no extra charge.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Power Your Future?</h2>
            <p className="text-xl text-white/80 mb-10">Book a free, no-obligation site survey and get a detailed solar proposal for your home or business.</p>
            <Link href="/contact" data-testid="link-cta-survey" className="inline-flex h-14 items-center justify-center rounded-lg bg-secondary px-10 font-bold text-secondary-foreground transition-all hover:bg-secondary/90 hover:scale-105 shadow-xl text-lg">
              Book a Free Site Survey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
