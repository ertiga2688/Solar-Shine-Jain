import React, { useEffect } from "react";
import { Link } from "wouter";
import { Home, Building2, Factory, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Solutions() {
  useEffect(() => {
    document.title = "Solar Solutions | Jain Communications";
  }, []);

  const solutions = [
    {
      id: "residential",
      icon: Home,
      title: "Residential Solar",
      description: "Power your home, cut electricity bills to zero, and increase your property value. Perfect for independent houses and villas.",
      features: [
        "1kW to 10kW system sizes",
        "PM Surya Ghar Yojana subsidy applicable",
        "Net metering integration",
        "Smart mobile monitoring",
        "Aesthetic rooftop integration"
      ],
      ideal: "Monthly bills ₹1,500 to ₹10,000"
    },
    {
      id: "commercial",
      icon: Building2,
      title: "Commercial Solar",
      description: "Reduce operational costs and achieve ESG goals. Ideal for schools, hospitals, hotels, and office buildings.",
      features: [
        "10kW to 100kW system sizes",
        "Accelerated depreciation benefits",
        "Custom mounting structures",
        "Zero-downtime installation",
        "Comprehensive O&M contracts"
      ],
      ideal: "Monthly bills ₹20,000 to ₹2,00,000"
    },
    {
      id: "industrial",
      icon: Factory,
      title: "Industrial Solar",
      description: "Large-scale power plants for manufacturing units and factories. Hedge against rising commercial tariffs.",
      features: [
        "100kW+ utility-scale systems",
        "High-efficiency string/central inverters",
        "Grid synchronization & protection",
        "Advanced SCADA monitoring",
        "Detailed financial modeling (IRR/Payback)"
      ],
      ideal: "Heavy machinery & manufacturing units"
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Solar Solutions for Every Need</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            From compact home systems to massive industrial power plants, we engineer solutions that deliver maximum yield.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((sol) => (
              <div key={sol.id} className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col hover:border-secondary/50 transition-colors">
                <div className="p-8 pb-0">
                  <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                    <sol.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary mb-3">{sol.title}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed min-h-[80px]">
                    {sol.description}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 mt-auto flex-1 flex flex-col">
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Key Features</div>
                    <ul className="space-y-3">
                      {sol.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 shrink-0" />
                          <span className="text-sm text-gray-700">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-gray-200">
                    <div className="text-sm text-muted-foreground mb-4">
                      <strong>Ideal for:</strong> {sol.ideal}
                    </div>
                    <Link href="/contact" className="w-full">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12">
                        Get a Quote <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Seamless Process</h2>
            <p className="text-lg text-muted-foreground">From the first call to flipping the switch, we make going solar effortless.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Site Survey", desc: "We assess your roof space, shadow profile, and electricity bills." },
              { step: "02", title: "System Design", desc: "Our engineers design a customized 3D layout for maximum efficiency." },
              { step: "03", title: "Installation", desc: "Expert installation using premium materials in just 2-3 days." },
              { step: "04", title: "Commissioning", desc: "Net metering setup, subsidy processing, and handing over the system." }
            ].map((p, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-black text-secondary/20 mb-4">{p.step}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{p.title}</h3>
                <p className="text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
