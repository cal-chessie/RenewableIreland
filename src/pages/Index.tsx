import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import PremiumBillUpload from '@/components/PremiumBillUpload';
import ProposalResults from '@/components/ProposalResults';
import SEOHead from '@/components/SEOHead';
import { LogIn } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);

  return (
    <>
      <SEOHead
        title="Solar Automation Platform - Instant Solar Proposals for Ireland"
        description="Upload your electricity bill and get an instant solar panel proposal with accurate savings calculations. Free consultation with certified solar experts. SEAI grants available."
        keywords="solar panels Ireland, solar calculator, electricity bill analysis, solar savings, SEAI grants, solar installation Ireland, renewable energy"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Solar Automation Platform',
          description: 'Instant solar panel proposals and consultations for Irish homes',
          priceRange: '€€',
          image: '/placeholder.svg',
          serviceType: 'Solar Panel Installation',
          areaServed: {
            '@type': 'Country',
            name: 'Ireland',
          },
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
        <div className="container mx-auto py-8">
          <header className="mb-8 text-center">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-bold text-slate-900">Solar Automation Platform</h1>
              <Button onClick={() => navigate('/auth')} variant="outline" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Consultant Login
              </Button>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get instant solar panel proposals with accurate savings calculations. Upload your bill and receive a customized plan in minutes.
            </p>
          </header>

          {!showResults ? (
            <PremiumBillUpload 
              onUploadComplete={(data) => {
                console.log('Upload complete:', data);
                setShowResults(true);
              }}
            />
          ) : (
            <ProposalResults 
              onStartOver={() => setShowResults(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
