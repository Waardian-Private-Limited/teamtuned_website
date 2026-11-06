"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { Building2, Globe2, Cpu, ShieldCheck, Rocket } from "lucide-react";

const stats = [
  { label: "Organizations", value: 2, suffix: "+" },
  { label: "Active Users", value: 1200, suffix: "+" },
  { label: "Uptime SLA", value: 99.9, suffix: "%", decimals: 1 },
];

const companies = [
  {
    name: "Empire Group",
    image: "/blackText.png",
    width: 140,
    height: 60
  },
  {
    name: "Royal Cooling Systems",
    icon: Globe2,
    color: "text-indigo-600"
  }
];

function Counter({ value, suffix = "", decimals = 0 }: { value: number, suffix?: string, decimals?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => latest.toFixed(decimals));

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return (
    <span className="flex items-center justify-center">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function TrustedStats() {
  return (
    <section className="py-20 bg-white border-b border-gray-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-full bg-gradient-to-b from-gray-50/50 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stats Section (First) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="space-y-2 group"
            >
              <h3 className="text-5xl md:text-6xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-600">
                <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </h3>
              <p className="text-lg font-medium text-gray-600">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Separator */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto mb-16" />

        {/* Trusted By Section (Second) */}
        <div className="text-center space-y-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em]">
            Trusted by Leading Organizations
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
          >
            {companies.map((company, i) => {
              const Icon = company.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 group cursor-default"
                >
                  <div className={`p-2 rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-md transition-all duration-300 ${company.color || ''}`}>
                    {company.image ? (
                      /* Image Render */
                      <img
                        src={company.image}
                        alt={company.name}
                        className="h-6 w-auto md:h-8 object-contain"
                      />
                    ) : (
                      /* Icon Render */
                      Icon && <Icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                    )}
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-gray-400 font-serif group-hover:text-gray-800 transition-colors">
                    {company.name}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
