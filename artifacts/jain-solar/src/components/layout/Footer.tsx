import React from "react";
import { Link } from "wouter";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { BUSINESS_DETAILS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/jc-logo.jpg"
                alt="Jain Communications Logo"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <span className="font-bold text-xl">Jain Communications</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Premium solar solutions provider in Nakodar, Punjab. Empowering homes and businesses with clean, reliable, and affordable solar energy.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-primary-foreground/80 hover:text-secondary transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-primary-foreground/80 hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/solutions" className="text-primary-foreground/80 hover:text-secondary transition-colors">Solar Solutions</Link></li>
              <li><Link href="/projects" className="text-primary-foreground/80 hover:text-secondary transition-colors">Our Projects</Link></li>
              <li><Link href="/subsidy" className="text-primary-foreground/80 hover:text-secondary transition-colors">Government Subsidy</Link></li>
              <li><Link href="/faq" className="text-primary-foreground/80 hover:text-secondary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-primary-foreground/80">Residential Rooftop Solar</li>
              <li className="text-primary-foreground/80">Commercial Solar Plants</li>
              <li className="text-primary-foreground/80">Industrial Solar Solutions</li>
              <li className="text-primary-foreground/80">Solar Subsidy Assistance</li>
              <li className="text-primary-foreground/80">Operation & Maintenance</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <span>{BUSINESS_DETAILS.address}</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:+91${BUSINESS_DETAILS.phone1}`} className="hover:text-secondary">+91 {BUSINESS_DETAILS.phone1}</a>
                  <a href={`tel:+91${BUSINESS_DETAILS.phone2}`} className="hover:text-secondary">+91 {BUSINESS_DETAILS.phone2}</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a href={`mailto:${BUSINESS_DETAILS.email}`} className="hover:text-secondary">{BUSINESS_DETAILS.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} {BUSINESS_DETAILS.companyName}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
