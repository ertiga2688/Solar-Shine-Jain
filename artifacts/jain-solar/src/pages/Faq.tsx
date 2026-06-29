import React, { useEffect } from "react";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function Faq() {
  useEffect(() => {
    document.title = "FAQ | Jain Communications";
  }, []);

  const faqs = [
    {
      question: "What size solar system do I need for my home?",
      answer: "System size depends on your average monthly electricity consumption and available shadow-free roof area. Generally, a 1 kW system generates about 4 units per day. If your monthly bill is around ₹3,000, a 3 kW system is usually recommended."
    },
    {
      question: "Am I eligible for the PM Surya Ghar Yojana subsidy?",
      answer: "Yes, residential consumers installing grid-connected rooftop solar systems are eligible. The subsidy is up to ₹78,000 for systems 3 kW and above. You must use domestically manufactured solar panels (DCR) and get the installation done by an MNRE empaneled vendor like Jain Communications."
    },
    {
      question: "How long does the installation process take?",
      answer: "The physical installation usually takes 2-4 days. However, the complete process—including site survey, DISCOM feasibility approval, net meter installation, and commissioning—can take 3 to 6 weeks depending on local electricity board timelines."
    },
    {
      question: "What is Net Metering?",
      answer: "Net metering is a billing mechanism that credits solar energy system owners for the electricity they add to the grid. If your solar panels generate more electricity than you use during the day, the excess is sent to the grid. At night, you draw from the grid. You are billed only for the 'net' energy used."
    },
    {
      question: "Do solar panels work during power cuts?",
      answer: "Standard grid-tied (On-grid) solar systems shut down during power cuts for safety reasons (anti-islanding), to protect line workers fixing the grid. If you need backup during power cuts, you will need a Hybrid solar system with batteries."
    },
    {
      question: "How much maintenance do solar panels require?",
      answer: "Solar panels require very little maintenance as there are no moving parts. The main requirement is regular cleaning (washing with water) to remove dust, bird droppings, or leaves, which can reduce efficiency. We recommend cleaning them every 15-20 days depending on the dust in your area."
    },
    {
      question: "What is the lifespan of a solar power plant?",
      answer: "High-quality solar panels are designed to last 25 to 30 years. The inverters typically have a lifespan of 10-15 years and may need replacement once during the life of the plant."
    },
    {
      question: "Does Jain Communications provide financing options?",
      answer: "Yes, we work with several leading banks and NBFCs that offer dedicated solar loans at attractive interest rates to make your transition to solar highly affordable."
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-24">
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Everything you need to know about switching to solar energy, government subsidies, and our services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold text-primary hover:text-secondary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 bg-gray-50 rounded-xl p-8 text-center border border-gray-100">
            <h3 className="text-2xl font-bold text-primary mb-3">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">Our solar experts are ready to provide you with all the answers you need.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
