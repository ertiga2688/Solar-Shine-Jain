import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, IndianRupee, Leaf, Zap } from "lucide-react";

export default function SavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState([3000]);
  
  // Basic calculations
  // Assuming 1 kW saves roughly ₹1000 per month
  const recommendedSize = Math.max(1, Math.ceil(monthlyBill[0] / 1000));
  const estimatedSavings = monthlyBill[0] * 12 * 0.9; // 90% savings annually
  const paybackPeriod = 3.5; // Roughly 3.5 years payback
  const co2Offset = recommendedSize * 1.5; // Roughly 1.5 tons per kW per year
  const treesPlanted = Math.round(co2Offset * 20); // 1 ton CO2 ~ 20 trees

  return (
    <Card className="border-0 shadow-xl overflow-hidden bg-white">
      <div className="bg-primary p-6 text-white text-center">
        <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Sun className="w-6 h-6 text-secondary" />
          Solar Savings Calculator
        </h3>
        <p className="text-primary-foreground/80 mt-2">See how much you can save by switching to solar</p>
      </div>
      
      <CardContent className="p-8">
        <div className="mb-10">
          <div className="flex justify-between items-end mb-6">
            <div>
              <label className="text-sm font-semibold text-muted-foreground block mb-1">Your Average Monthly Electricity Bill</label>
              <div className="text-4xl font-bold text-primary flex items-center">
                <IndianRupee className="w-8 h-8" />
                {monthlyBill[0].toLocaleString('en-IN')}
              </div>
            </div>
          </div>
          
          <Slider 
            defaultValue={[3000]} 
            max={20000} 
            min={500} 
            step={500}
            value={monthlyBill}
            onValueChange={setMonthlyBill}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>₹500</span>
            <span>₹20,000+</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50 rounded-xl p-6 border border-slate-100">
          <div className="text-center">
            <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-5 h-5 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-primary">{recommendedSize} kW</div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">Suggested System</div>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <IndianRupee className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">₹{(Math.round(estimatedSavings)).toLocaleString('en-IN')}</div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">Annual Savings</div>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sun className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-primary">{paybackPeriod} Yrs</div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">Payback Period</div>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-primary">{treesPlanted}</div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">Trees Planted / Yr</div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          * Estimates are indicative. Actual savings depend on location, roof space, and exact tariff.
        </div>
      </CardContent>
    </Card>
  );
}
