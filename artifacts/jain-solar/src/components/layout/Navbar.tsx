import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, PhoneCall } from "lucide-react";
import { BUSINESS_DETAILS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Solutions", href: "/solutions" },
    { name: "Projects", href: "/projects" },
    { name: "Subsidy", href: "/subsidy" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-md py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/jc-logo.jpg"
            alt="Jain Communications Logo"
            className="w-10 h-10 rounded-lg object-cover"
          />
          <span className="font-bold text-xl text-primary hidden sm:block">
            Jain Communications
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-colors hover:text-secondary ${
                location === link.href ? "text-secondary" : "text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={BUSINESS_DETAILS.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold flex items-center gap-2 text-primary hover:text-secondary transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            {BUSINESS_DETAILS.phone1}
          </a>
          <Link href="/contact" className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-6 font-medium text-secondary-foreground transition-colors hover:bg-secondary/90 shadow-sm">
            Get Quote
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-6 py-3 font-medium ${
                  location === link.href
                    ? "text-secondary bg-secondary/10"
                    : "text-foreground hover:bg-gray-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className={`px-6 py-3 font-medium ${
                location === "/contact"
                  ? "text-secondary bg-secondary/10"
                  : "text-foreground hover:bg-gray-50"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
