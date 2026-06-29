import React, { useEffect } from "react";
import { Link } from "wouter";
import { IndianRupee, FileText, CheckCircle, ArrowRight } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

export default function Subsidy() {
  useEffect(() => {
    document.title = "PM Surya Ghar Yojana Subsidy | Jain Communications";
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-white">
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground rounded-full font-bold text-sm mb-6 uppercase tracking-wider">
              Government Initiative
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">PM Surya Ghar: Muft Bijli Yojana</h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Get up to ₹78,000 subsidy directly in your bank account. We make the entire application and installation process seamless for you.
            </p>
            <a 
              href="https://pmsuryaghar.gov.in" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 bg-transparent px-8 font-medium text-white transition-colors hover:bg-white/10"
            >
              Visit Official Portal
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-12 text-center">Subsidy Structure</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-md border-t-4 border-t-secondary text-center">
                <div className="text-xl font-bold text-primary mb-2">Up to 2 kW</div>
                <div className="text-4xl font-black text-secondary mb-4">₹30,000</div>
                <div className="text-sm text-muted-foreground">per kW</div>
                <div className="mt-4 pt-4 border-t border-gray-100 text-sm font-medium">Max: ₹60,000</div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-md border-t-4 border-t-secondary text-center transform md:-translate-y-4 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">Most Popular</div>
                <div className="text-xl font-bold text-primary mb-2">Additional 1 kW</div>
                <div className="text-4xl font-black text-secondary mb-4">₹18,000</div>
                <div className="text-sm text-muted-foreground">(For system capacity 2 to 3 kW)</div>
                <div className="mt-4 pt-4 border-t border-gray-100 text-sm font-medium">Max Total: ₹78,000</div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-md border-t-4 border-t-primary text-center">
                <div className="text-xl font-bold text-primary mb-2">Above 3 kW</div>
                <div className="text-4xl font-black text-primary mb-4">₹78,000</div>
                <div className="text-sm text-muted-foreground">Fixed Maximum Subsidy</div>
                <div className="mt-4 pt-4 border-t border-gray-100 text-sm font-medium">For any size above 3kW</div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-primary mb-10 text-center">How to Apply</h2>
            
            <div className="relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2"></div>
              
              <div className="space-y-12">
                {[
                  { title: "Registration", desc: "Register on pmsuryaghar.gov.in using your State, Electricity Distribution Company, Consumer Number, and Mobile Number.", icon: FileText },
                  { title: "Apply for Rooftop Solar", desc: "Login with Consumer Number & Mobile Number. Apply for the Rooftop Solar as per the form.", icon: IndianRupee },
                  { title: "Feasibility Approval", desc: "Wait for feasibility approval from your DISCOM. Once approved, get the plant installed by a registered vendor like Jain Communications.", icon: CheckCircle },
                  { title: "Submit Installation Details", desc: "Once installation is complete, submit the plant details and apply for a net meter.", icon: FileText },
                  { title: "Inspection & Commissioning", desc: "After installation of net meter and inspection by DISCOM, a commissioning certificate will be generated.", icon: CheckCircle },
                  { title: "Subsidy Disbursement", desc: "Submit your bank account details and a cancelled cheque. You will receive your subsidy in your bank account within 30 days.", icon: IndianRupee }
                ].map((step, idx) => (
                  <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    <div className="flex-1 w-full">
                      <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ${idx % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                        <div className="text-sm font-bold text-secondary mb-2">STEP 0{idx + 1}</div>
                        <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                        <p className="text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 border-4 border-gray-50 z-10">
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 hidden md:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
              <h2 className="text-3xl font-bold text-primary mb-4 text-center">Need Help with Subsidy?</h2>
              <p className="text-muted-foreground text-center mb-8">
                The paperwork can be confusing. Let Jain Communications handle the entire process for you—from initial registration to final subsidy disbursement.
              </p>
              <ContactForm defaultType="subsidy" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
