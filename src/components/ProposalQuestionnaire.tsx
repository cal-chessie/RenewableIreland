import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ChevronRight, ChevronLeft, Save, FileText, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ProposalQuestionnaireProps {
  leadId: string;
  proposalId?: string;
  initialData?: Record<string, any> | null;
  onBack?: () => void;
}

const TOTAL_STEPS = 26;

export default function ProposalQuestionnaire({ leadId, proposalId, initialData, onBack }: ProposalQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (proposalId) {
      loadProposal();
    } else if (initialData) {
      // Pre-fill from survey data
      setFormData(prev => ({ ...prev, ...initialData }));
      toast({
        title: 'Survey data loaded',
        description: 'Form pre-filled with survey information',
      });
    }
  }, [proposalId, initialData]);

  const loadProposal = async () => {
    if (!proposalId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('id', proposalId)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          propertyType: data.property_type || 'residential',
          annualConsumption: data.current_annual_consumption_kwh?.toString() || '',
          systemSize: data.system_size_kw?.toString() || '',
          roofType: data.roof_type || '',
          roofMaterial: data.roof_material || '',
          roofOrientation: data.roof_orientation || '',
          roofPitch: data.roof_pitch?.toString() || '',
          roofCondition: data.roof_condition || '',
          shadingLevel: data.shading_level || '',
          batteryStorage: data.battery_storage ? 'yes' : 'no',
          batteryCapacity: data.battery_capacity_kwh?.toString() || '',
          panelType: data.panel_type || '',
          inverterType: data.inverter_type || '',
          currentTariff: '0.35',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error loading proposal',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSave = () => {
    toast({
      title: 'Progress saved',
      description: `Questionnaire progress saved for step ${currentStep}`,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: 'Not signed in',
          description: 'Please log in again to create a proposal.',
          variant: 'destructive',
        });
        return;
      }

      const annualConsumption = parseFloat(formData.annualConsumption || '0');
      const currentTariff = parseFloat(formData.currentTariff || '0.35');
      const systemSizeKw = parseFloat(formData.systemSize || (annualConsumption ? (annualConsumption / 900).toFixed(1) : '0'));
      const estimatedProduction = systemSizeKw * 900;
      const monthlySavings = estimatedProduction && currentTariff ? (estimatedProduction * currentTariff) / 12 : null;
      const systemCost = systemSizeKw ? systemSizeKw * 1400 : null;
      
      // Updated SEAI Grant Logic (2024): €1,800 max for domestic systems ≥2kWp
      const propertyType = formData.propertyType || 'residential';
      let seaiGrant = 0;
      let requiresReview = false;
      
      if (propertyType === 'residential') {
        // Domestic: €900/kWp up to €1,800 max for systems ≥2kWp
        seaiGrant = systemSizeKw >= 2 ? 1800 : Math.round(systemSizeKw * 900);
      } else if (propertyType === 'commercial') {
        // Commercial: €900/kWp up to €2,700 for <6kWp, then €300/kWp additional
        if (systemSizeKw < 6) {
          seaiGrant = Math.min(2700, Math.round(systemSizeKw * 900));
        } else if (systemSizeKw <= 50) {
          seaiGrant = 2700 + Math.round((systemSizeKw - 6) * 300);
          seaiGrant = Math.min(16200, seaiGrant);
          requiresReview = systemSizeKw > 20;
        } else {
          seaiGrant = 16200; // Estimate pending consultation
          requiresReview = true;
        }
      } else if (propertyType === 'industrial') {
        seaiGrant = 0;
        requiresReview = true;
      }
      
      const netCost = systemCost !== null ? systemCost - seaiGrant : null;
      const annualSavings = monthlySavings !== null ? monthlySavings * 12 : null;
      const paybackYears = netCost !== null && annualSavings ? netCost / annualSavings : null;

      const proposalData = {
        lead_id: leadId,
        consultant_id: user.id,
        system_size_kw: systemSizeKw || null,
        estimated_annual_production_kwh: estimatedProduction || null,
        monthly_savings: monthlySavings || null,
        system_cost: systemCost || null,
        seai_grant: seaiGrant || null,
        net_cost: netCost || null,
        payback_period_years: paybackYears || null,
        property_type: propertyType,
        requires_review: requiresReview,
        roof_type: formData.roofType || null,
        roof_material: formData.roofMaterial || null,
        roof_orientation: formData.roofOrientation || null,
        roof_pitch: formData.roofPitch ? parseFloat(formData.roofPitch) : null,
        roof_condition: formData.roofCondition || null,
        shading_level: formData.shadingLevel || null,
        battery_storage: formData.batteryStorage === 'yes',
        battery_capacity_kwh: formData.batteryCapacity ? parseFloat(formData.batteryCapacity) : null,
        panel_type: formData.panelType || null,
        inverter_type: formData.inverterType || null,
        current_annual_consumption_kwh: annualConsumption || null,
        status: proposalId ? 'draft' : 'draft',
      };

      let error;
      if (proposalId) {
        const result = await supabase
          .from('proposals')
          .update(proposalData)
          .eq('id', proposalId);
        error = result.error;
      } else {
        const result = await supabase
          .from('proposals')
          .insert(proposalData);
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: proposalId ? 'Proposal updated' : 'Proposal generated',
        description: `Your proposal has been ${proposalId ? 'updated' : 'created'} successfully.`,
      });

      if (onBack) {
        onBack();
      }
    } catch (error: any) {
      toast({
        title: 'Error saving proposal',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if field has prefilled data from survey
  const isFieldPrefilled = (fieldName: string) => {
    return initialData && initialData[fieldName];
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="property-type" className="flex items-center gap-2">
                Property Type
                {isFieldPrefilled('propertyType') && <CheckCircle className="h-4 w-4 text-green-500" />}
              </Label>
              <Select 
                value={formData.propertyType || ''} 
                onValueChange={(value) => updateFormData('propertyType', value)}
              >
                <SelectTrigger id="property-type">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="roof-type" className="flex items-center gap-2">
                Roof Type
                {isFieldPrefilled('roofType') && <CheckCircle className="h-4 w-4 text-green-500" />}
              </Label>
              <Select 
                value={formData.roofType || ''} 
                onValueChange={(value) => updateFormData('roofType', value)}
              >
                <SelectTrigger id="roof-type">
                  <SelectValue placeholder="Select roof type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pitched">Pitched</SelectItem>
                  <SelectItem value="flat">Flat</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="roof-material" className="flex items-center gap-2">
                Roof Material
                {isFieldPrefilled('roofMaterial') && <CheckCircle className="h-4 w-4 text-green-500" />}
              </Label>
              <Select 
                value={formData.roofMaterial || ''} 
                onValueChange={(value) => updateFormData('roofMaterial', value)}
              >
                <SelectTrigger id="roof-material">
                  <SelectValue placeholder="Select roof material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Concrete tiles">Concrete tiles</SelectItem>
                  <SelectItem value="Clay tiles">Clay tiles</SelectItem>
                  <SelectItem value="Slate">Slate</SelectItem>
                  <SelectItem value="Metal">Metal</SelectItem>
                  <SelectItem value="Felt/Membrane">Felt/Membrane</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="roof-age">Roof Age (years)</Label>
              <Input
                id="roof-age"
                type="number"
                placeholder="Enter roof age"
                value={formData.roofAge || ''}
                onChange={(e) => updateFormData('roofAge', e.target.value)}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2">
                Shading Analysis
                {isFieldPrefilled('shadingLevel') && <CheckCircle className="h-4 w-4 text-green-500" />}
              </Label>
              <RadioGroup 
                value={formData.shadingAnalysis || formData.shadingLevel || ''} 
                onValueChange={(value) => updateFormData('shadingAnalysis', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="None" id="shading-none" />
                  <Label htmlFor="shading-none">No shading</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Minimal" id="shading-minimal" />
                  <Label htmlFor="shading-minimal">Minimal shading</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Partial" id="shading-moderate" />
                  <Label htmlFor="shading-moderate">Moderate shading</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Significant" id="shading-significant" />
                  <Label htmlFor="shading-significant">Significant shading</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="annual-consumption" className="flex items-center gap-2">
                Annual Energy Consumption (kWh)
                {isFieldPrefilled('annualConsumption') && <CheckCircle className="h-4 w-4 text-green-500" />}
              </Label>
              <Input
                id="annual-consumption"
                type="number"
                placeholder="Enter annual kWh"
                value={formData.annualConsumption || ''}
                onChange={(e) => updateFormData('annualConsumption', e.target.value)}
              />
              {isFieldPrefilled('annualConsumption') && (
                <p className="text-xs text-green-600 mt-1">Calculated from monthly bill</p>
              )}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="peak-usage">Peak Usage Time</Label>
              <Select 
                value={formData.peakUsage || ''} 
                onValueChange={(value) => updateFormData('peakUsage', value)}
              >
                <SelectTrigger id="peak-usage">
                  <SelectValue placeholder="Select peak usage time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (6am-12pm)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12pm-6pm)</SelectItem>
                  <SelectItem value="evening">Evening (6pm-12am)</SelectItem>
                  <SelectItem value="night">Night (12am-6am)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-tariff">Current Electricity Tariff (€/kWh)</Label>
              <Input
                id="current-tariff"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.currentTariff || ''}
                onChange={(e) => updateFormData('currentTariff', e.target.value)}
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-4">
            <div>
              <Label>Battery Storage Interest</Label>
              <RadioGroup 
                value={formData.batteryInterest || ''} 
                onValueChange={(value) => updateFormData('batteryInterest', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="battery-yes" />
                  <Label htmlFor="battery-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="battery-no" />
                  <Label htmlFor="battery-no">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maybe" id="battery-maybe" />
                  <Label htmlFor="battery-maybe">Maybe later</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="system-size" className="flex items-center gap-2">
                Desired System Size (kW)
                {isFieldPrefilled('systemSize') && <CheckCircle className="h-4 w-4 text-green-500" />}
              </Label>
              <Input
                id="system-size"
                type="number"
                step="0.1"
                placeholder="Enter system size"
                value={formData.systemSize || ''}
                onChange={(e) => updateFormData('systemSize', e.target.value)}
              />
              {isFieldPrefilled('systemSize') && (
                <p className="text-xs text-green-600 mt-1">Recommended from survey</p>
              )}
            </div>
          </div>
        );

      case 11:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="panel-preference">Panel Brand Preference</Label>
              <Select 
                value={formData.panelPreference || ''} 
                onValueChange={(value) => updateFormData('panelPreference', value)}
              >
                <SelectTrigger id="panel-preference">
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="premium">Premium brands</SelectItem>
                  <SelectItem value="mid">Mid-range brands</SelectItem>
                  <SelectItem value="budget">Budget friendly</SelectItem>
                  <SelectItem value="no-preference">No preference</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 12:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="inverter-type">Inverter Type Preference</Label>
              <Select 
                value={formData.inverterType || ''} 
                onValueChange={(value) => updateFormData('inverterType', value)}
              >
                <SelectTrigger id="inverter-type">
                  <SelectValue placeholder="Select inverter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String inverter</SelectItem>
                  <SelectItem value="micro">Micro inverters</SelectItem>
                  <SelectItem value="hybrid">Hybrid inverter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 13:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="budget">Budget Range (€)</Label>
              <Select 
                value={formData.budget || ''} 
                onValueChange={(value) => updateFormData('budget', value)}
              >
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5000-8000">€5,000 - €8,000</SelectItem>
                  <SelectItem value="8000-12000">€8,000 - €12,000</SelectItem>
                  <SelectItem value="12000-15000">€12,000 - €15,000</SelectItem>
                  <SelectItem value="15000+">€15,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 14:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="financing">Financing Option</Label>
              <Select 
                value={formData.financing || ''} 
                onValueChange={(value) => updateFormData('financing', value)}
              >
                <SelectTrigger id="financing">
                  <SelectValue placeholder="Select financing option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Full payment upfront</SelectItem>
                  <SelectItem value="loan">Solar loan</SelectItem>
                  <SelectItem value="lease">Lease option</SelectItem>
                  <SelectItem value="ppa">Power Purchase Agreement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 15:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="timeline">Installation Timeline Preference</Label>
              <Select 
                value={formData.timeline || ''} 
                onValueChange={(value) => updateFormData('timeline', value)}
              >
                <SelectTrigger id="timeline">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">As soon as possible</SelectItem>
                  <SelectItem value="1-3months">1-3 months</SelectItem>
                  <SelectItem value="3-6months">3-6 months</SelectItem>
                  <SelectItem value="6months+">6+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      // Steps 16-25: Additional questions
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor={`additional-${currentStep}`}>Additional Information (Step {currentStep})</Label>
              <Textarea
                id={`additional-${currentStep}`}
                placeholder="Enter any additional information..."
                value={formData[`additional${currentStep}`] || ''}
                onChange={(e) => updateFormData(`additional${currentStep}`, e.target.value)}
              />
            </div>
          </div>
        );

      case 26:
        return (
          <div className="space-y-4 text-center">
            <FileText className="mx-auto h-16 w-16 text-primary" />
            <h3 className="text-xl font-bold">Ready to Generate Proposal</h3>
            <p className="text-slate-600">
              Review your answers and click "Generate Proposal" to create your solar system proposal.
            </p>
            {initialData && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-green-700 text-sm flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Pre-filled with survey data - no double entry needed!
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const titles: { [key: number]: string } = {
      1: 'Property Type',
      2: 'Roof Type',
      3: 'Roof Material',
      4: 'Roof Age',
      5: 'Shading Analysis',
      6: 'Energy Consumption',
      7: 'Peak Usage',
      8: 'Current Tariff',
      9: 'Battery Interest',
      10: 'System Size',
      11: 'Panel Preference',
      12: 'Inverter Type',
      13: 'Budget Range',
      14: 'Financing Option',
      15: 'Installation Timeline',
      16: 'Property Access',
      17: 'Grid Connection',
      18: 'Meter Details',
      19: 'EV Charger Interest',
      20: 'Smart Home Integration',
      21: 'Monitoring Preferences',
      22: 'Warranty Expectations',
      23: 'Maintenance Plan',
      24: 'Environmental Goals',
      25: 'Additional Notes',
      26: 'Review & Generate',
    };
    return titles[currentStep] || `Step ${currentStep}`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">
            Step {currentStep} of {TOTAL_STEPS}
          </span>
          <span className="text-sm text-slate-500">
            {Math.round((currentStep / TOTAL_STEPS) * 100)}% complete
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {getStepTitle()}
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                Cancel
              </Button>
            )}
          </CardTitle>
          <CardDescription>
            {currentStep === 26 
              ? 'Final step - generate your proposal' 
              : 'Please provide the following information'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ChevronLeft size={18} />
          Previous
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave} className="gap-2">
            <Save size={18} />
            Save
          </Button>

          {currentStep === TOTAL_STEPS ? (
            <Button 
              onClick={handleSubmit} 
              disabled={loading}
              className="gap-2 gradient-primary text-white"
            >
              <FileText size={18} />
              {loading ? 'Generating...' : 'Generate Proposal'}
            </Button>
          ) : (
            <Button onClick={handleNext} className="gap-2">
              Next
              <ChevronRight size={18} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
