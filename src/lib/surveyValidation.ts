// Survey Validation & Completion Logic

export interface SurveyCompletionStatus {
  isComplete: boolean;
  completionPercentage: number;
  missingFields: string[];
  sections: {
    roof: { complete: boolean; fields: string[] };
    electrical: { complete: boolean; fields: string[] };
    recommendations: { complete: boolean; fields: string[] };
    photos: { complete: boolean; count: number; required: number };
  };
}

export interface SurveyData {
  roof_type?: string;
  roof_condition?: string;
  roof_orientation?: string;
  roof_pitch?: number | string;
  roof_material?: string;
  electrical_panel_capacity?: string;
  electrical_panel_condition?: string;
  grid_connection_type?: string;
  recommended_system_size?: number | string;
  recommended_panel_count?: number | string;
  shading_analysis?: string;
  installation_notes?: string;
  special_requirements?: string;
}

export function validateSurveyCompletion(
  surveyData: SurveyData,
  photoCount: number = 0
): SurveyCompletionStatus {
  const missingFields: string[] = [];
  
  // Roof section (required: type, condition, orientation, pitch, material)
  const roofFields: string[] = [];
  if (!surveyData.roof_type) roofFields.push('Roof Type');
  if (!surveyData.roof_condition) roofFields.push('Roof Condition');
  if (!surveyData.roof_orientation) roofFields.push('Roof Orientation');
  if (!surveyData.roof_pitch) roofFields.push('Roof Pitch');
  if (!surveyData.roof_material) roofFields.push('Roof Material');
  
  // Electrical section (required: panel capacity, panel condition, grid connection)
  const electricalFields: string[] = [];
  if (!surveyData.electrical_panel_capacity) electricalFields.push('Panel Capacity');
  if (!surveyData.electrical_panel_condition) electricalFields.push('Panel Condition');
  if (!surveyData.grid_connection_type) electricalFields.push('Grid Connection Type');
  
  // Recommendations section (required: system size, panel count)
  const recommendationsFields: string[] = [];
  if (!surveyData.recommended_system_size) recommendationsFields.push('Recommended System Size');
  if (!surveyData.recommended_panel_count) recommendationsFields.push('Recommended Panel Count');
  
  // Photo requirements (minimum 2 photos)
  const requiredPhotos = 2;
  const photosComplete = photoCount >= requiredPhotos;
  
  // Combine all missing fields
  missingFields.push(...roofFields, ...electricalFields, ...recommendationsFields);
  if (!photosComplete) {
    missingFields.push(`At least ${requiredPhotos} photos required (${photoCount} uploaded)`);
  }
  
  // Calculate completion percentage
  const totalRequiredFields = 10; // 5 roof + 3 electrical + 2 recommendations
  const completedFields = totalRequiredFields - (roofFields.length + electricalFields.length + recommendationsFields.length);
  const fieldPercentage = (completedFields / totalRequiredFields) * 80; // Fields worth 80%
  const photoPercentage = photosComplete ? 20 : (photoCount / requiredPhotos) * 20; // Photos worth 20%
  const completionPercentage = Math.round(fieldPercentage + photoPercentage);
  
  const isComplete = missingFields.length === 0;
  
  return {
    isComplete,
    completionPercentage,
    missingFields,
    sections: {
      roof: { complete: roofFields.length === 0, fields: roofFields },
      electrical: { complete: electricalFields.length === 0, fields: electricalFields },
      recommendations: { complete: recommendationsFields.length === 0, fields: recommendationsFields },
      photos: { complete: photosComplete, count: photoCount, required: requiredPhotos }
    }
  };
}

// Map survey data to proposal data
export function mapSurveyToProposal(surveyData: any, leadData: any) {
  const systemSize = parseFloat(surveyData.recommended_system_size) || 0;
  const panelCount = parseInt(surveyData.recommended_panel_count) || 0;
  
  // Calculate annual consumption from monthly bill (rough estimate)
  const monthlyBill = leadData?.monthly_bill || 0;
  const avgTariff = 0.35;
  const estimatedAnnualConsumption = monthlyBill > 0 
    ? Math.round((monthlyBill / avgTariff) * 12) 
    : systemSize * 900;

  return {
    // From survey
    roofType: surveyData.roof_type,
    roofCondition: surveyData.roof_condition,
    roofOrientation: surveyData.roof_orientation,
    roofPitch: surveyData.roof_pitch?.toString() || '',
    roofMaterial: surveyData.roof_material,
    shadingLevel: surveyData.shading_analysis || '',
    systemSize: systemSize.toString(),
    panelCapacity: surveyData.electrical_panel_capacity,
    specialRequirements: surveyData.special_requirements,
    
    // Calculated/derived
    annualConsumption: estimatedAnnualConsumption.toString(),
    estimatedCost: surveyData.estimated_installation_cost?.toString() || '',
    
    // Defaults
    currentTariff: '0.35',
    batteryInterest: 'no',
  };
}

// Get workflow stage based on data
export function getWorkflowStage(lead: any, survey: any, proposal: any): string {
  if (!lead) return 'unknown';
  
  // Check proposal status first
  if (proposal) {
    if (proposal.status === 'approved') return 'approved';
    if (proposal.status === 'presented') return 'presented';
    if (proposal.requires_review && !proposal.reviewed_at) return 'pending_review';
    if (proposal.status === 'draft') return 'proposal_draft';
  }
  
  // Check survey status
  if (survey) {
    if (survey.status === 'completed') return 'survey_complete';
    if (survey.status === 'in_progress') return 'survey_in_progress';
    if (survey.status === 'draft') return 'survey_draft';
  }
  
  // Lead-only stages
  if (lead.status === 'contacted') return 'contacted';
  if (lead.status === 'qualified') return 'qualified';
  
  return 'new';
}

export const WORKFLOW_STAGES = [
  { id: 'new', label: 'New Lead', color: 'bg-slate-100 text-slate-700' },
  { id: 'contacted', label: 'Contacted', color: 'bg-blue-100 text-blue-700' },
  { id: 'qualified', label: 'Qualified', color: 'bg-purple-100 text-purple-700' },
  { id: 'survey_draft', label: 'Survey Started', color: 'bg-orange-100 text-orange-700' },
  { id: 'survey_in_progress', label: 'Survey In Progress', color: 'bg-orange-100 text-orange-700' },
  { id: 'survey_complete', label: 'Survey Complete', color: 'bg-green-100 text-green-700' },
  { id: 'proposal_draft', label: 'Proposal Draft', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'pending_review', label: 'Pending Review', color: 'bg-red-100 text-red-700' },
  { id: 'presented', label: 'Presented', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'approved', label: 'Approved', color: 'bg-green-100 text-green-700' },
];
