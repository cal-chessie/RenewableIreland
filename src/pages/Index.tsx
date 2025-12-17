import { useRef } from 'react';
import { AIBillAnalyser } from '@/components/ai-analyser';
import SEOHead from '@/components/SEOHead';
import { Sun, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SiteNavigation from '@/components/layout/SiteNavigation';
import { brand } from '@/config/brand';
import { StickyCTA } from '@/components/landing';

const Index = () => {
  const analyserRef = useRef<HTMLDivElement>(null);

  const scrollToAnalyser = () => {
    analyserRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const stats = [
    { number: brand.stats.customers, label: 'Happy Customers' },
    { number: brand.stats.savingsGenerated, label: 'Savings Generated' },
    { number: brand.stats.installedCapacity, label: 'Installed Capacity' },
    { number: brand.stats.googleRating, label: 'Google Rating' },
  ];

  return (
    <>
      <SEOHead
        title={`Upload Your Bill | ${brand.name} - Free Solar Analysis`}
        description="Upload your electricity bill and get instant AI-powered solar savings estimates. Free analysis for Irish homes with SEAI grants included."
        keywords="solar bill upload, electricity bill analysis, solar savings calculator Ireland"
      />
      
      <div className="min-h-screen min-h-[100dvh] bg-background">
        <SiteNavigation />

        <main className="pb-24 md:pb-0">
          {/* Hero + AI Bill Analyser - Full Width Prominent Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-b">
            <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-6 sm:mb-10"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6"
                >
                  <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  SEAI Registered & RECI Certified
                </motion.div>
                
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                  Upload Your Bill
                  <br />
                  <span className="text-primary">Get Instant Savings</span>
                </h1>
                
                <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
                  Take a photo or upload your electricity bill for instant AI-powered solar savings analysis.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {brand.countryEmoji} Irish data • SEAI grants included • No obligation
                </p>
              </motion.div>

              {/* AI Bill Analyser - Full Width Card */}
              <div ref={analyserRef} className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-card rounded-2xl sm:rounded-3xl shadow-2xl shadow-primary/10 border border-border/50 p-6 sm:p-8 md:p-10"
                >
                  <AIBillAnalyser />
                </motion.div>
              </div>

              {/* Trust Stats - Mobile Optimized */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 sm:mt-16"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto">
                  {stats.map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                      className="text-center p-2 sm:p-4"
                    >
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-0.5 sm:mb-1">{stat.number}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Certifications - Mobile Optimized */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8"
              >
                {brand.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <span className="text-xs sm:text-sm font-medium">{cert.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer - Mobile Optimized */}
        <footer className="border-t bg-background pb-safe">
          <div className="container mx-auto px-4 py-6 sm:py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="text-sm sm:text-base font-semibold">{brand.name}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground text-center">
                © {new Date().getFullYear()} {brand.name}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        {/* Sticky Mobile CTA */}
        <StickyCTA onClick={scrollToAnalyser} />
      </div>
    </>
  );
};

export default Index;
