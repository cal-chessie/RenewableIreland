import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Save, CheckCircle, Upload, X, FileText, ArrowRight } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { validateSurveyCompletion, mapSurveyToProposal } from '@/lib/surveyValidation';
import SurveyProgressIndicator from '@/components/survey/SurveyProgressIndicator';

const surveySchema = z.object({
  roof_type: z.string().min(1, 'Roof type is required'),
  roof_condition: z.string().min(1, 'Roof condition is required'),
  roof_orientation: z.string().optional(),
  roof_pitch: z.string().optional(),
  roof_material: z.string().optional(),
  shading_analysis: z.string().optional(),
  nearby_obstructions: z.string().optional(),
  electrical_panel_capacity: z.string().optional(),
  electrical_panel_condition: z.string().optional(),
  meter_location: z.string().optional(),
  grid_connection_type: z.string().optional(),
  recommended_system_size: z.string().optional(),
  recommended_panel_count: z.string().optional(),
  estimated_installation_cost: z.string().optional(),
  installation_notes: z.string().optional(),
  special_requirements: z.string().optional(),
  status: z.string().default('draft'),
});

type SurveyFormData = z.infer<typeof surveySchema>;

interface SiteSurveyFormProps {
  leadId: string;
  onCreateProposal?: (surveyData: any, leadData: any) => void;
}

export default function SiteSurveyForm({ leadId, onCreateProposal }: SiteSurveyFormProps) {
  const [loading, setLoading] = useState(false);
  const [existingSurvey, setExistingSurvey] = useState<any>(null);
  const [leadData, setLeadData] = useState<any>(null);
  const [fetchingData, setFetchingData] = useState(true);
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<{ url: string; type: string; description: string }>>([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch, getValues } = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      status: 'draft',
    },
  });

  const status = watch('status');
  const formValues = watch();

  // Calculate completion status
  const completionStatus = validateSurveyCompletion(formValues, uploadedPhotos.length);

  useEffect(() => {
    fetchExistingSurvey();
  }, [leadId]);

  const fetchExistingSurvey = async () => {
    try {
      // Fetch lead data
      const { data: lead } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .single();
      
      if (lead) {
        setLeadData(lead);
      }

      const { data, error } = await supabase
        .from('site_surveys')
        .select('*')
        .eq('lead_id', leadId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setExistingSurvey(data);
        // Populate form with existing data
        Object.keys(data).forEach((key) => {
          if (data[key] !== null && key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
            setValue(key as any, String(data[key]));
          }
        });

        // Load existing photos
        const { data: photos } = await supabase
          .from('survey_photos')
          .select('*')
          .eq('survey_id', data.id);
        
        if (photos) {
          setUploadedPhotos(photos.map(p => ({
            url: p.photo_url,
            type: p.photo_type || 'general',
            description: p.description || '',
          })));
        }
      }
    } catch (error: any) {
      console.error('Error fetching survey:', error);
      toast({
        title: 'Error',
        description: 'Failed to load existing survey data',
        variant: 'destructive',
      });
    } finally {
      setFetchingData(false);
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setUploadingPhotos(true);
    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${leadId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('survey-photos')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('survey-photos')
          .getPublicUrl(fileName);

        return {
          url: publicUrl,
          type: 'general',
          description: file.name,
        };
      });

      const newPhotos = await Promise.all(uploadPromises);
      setUploadedPhotos(prev => [...prev, ...newPhotos]);

      toast({
        title: 'Photos uploaded',
        description: `${acceptedFiles.length} photo(s) uploaded successfully`,
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploadingPhotos(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 5242880, // 5MB
  });

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: SurveyFormData, shouldComplete: boolean = false) => {
    // Validate completion if trying to complete
    if (shouldComplete && !completionStatus.isComplete) {
      toast({
        title: 'Cannot Complete Survey',
        description: `Please fill in all required fields: ${completionStatus.missingFields.slice(0, 3).join(', ')}${completionStatus.missingFields.length > 3 ? '...' : ''}`,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const finalStatus = shouldComplete ? 'completed' : data.status;

      const surveyData = {
        lead_id: leadId,
        surveyor_id: user.id,
        roof_type: data.roof_type,
        roof_condition: data.roof_condition,
        roof_orientation: data.roof_orientation || null,
        roof_pitch: data.roof_pitch ? parseFloat(data.roof_pitch) : null,
        roof_material: data.roof_material || null,
        shading_analysis: data.shading_analysis || null,
        nearby_obstructions: data.nearby_obstructions || null,
        electrical_panel_capacity: data.electrical_panel_capacity || null,
        electrical_panel_condition: data.electrical_panel_condition || null,
        meter_location: data.meter_location || null,
        grid_connection_type: data.grid_connection_type || null,
        recommended_system_size: data.recommended_system_size ? parseFloat(data.recommended_system_size) : null,
        recommended_panel_count: data.recommended_panel_count ? parseInt(data.recommended_panel_count) : null,
        estimated_installation_cost: data.estimated_installation_cost ? parseFloat(data.estimated_installation_cost) : null,
        installation_notes: data.installation_notes || null,
        special_requirements: data.special_requirements || null,
        status: finalStatus,
        completed_at: finalStatus === 'completed' ? new Date().toISOString() : null,
      };

      let surveyId;
      if (existingSurvey) {
        const { error } = await supabase
          .from('site_surveys')
          .update(surveyData)
          .eq('id', existingSurvey.id);
        if (error) throw error;
        surveyId = existingSurvey.id;
      } else {
        const { data: newSurvey, error } = await supabase
          .from('site_surveys')
          .insert([surveyData])
          .select()
          .single();
        if (error) throw error;
        surveyId = newSurvey.id;
        setExistingSurvey(newSurvey);
      }

      // Save photos to survey_photos table
      if (uploadedPhotos.length > 0 && surveyId) {
        // Delete old photos first
        await supabase
          .from('survey_photos')
          .delete()
          .eq('survey_id', surveyId);

        // Insert new photos
        const photoInserts = uploadedPhotos.map(photo => ({
          survey_id: surveyId,
          photo_url: photo.url,
          photo_type: photo.type,
          description: photo.description,
        }));

        const { error: photoError } = await supabase
          .from('survey_photos')
          .insert(photoInserts);

        if (photoError) throw photoError;
      }

      // Update lead workflow stage
      if (finalStatus === 'completed') {
        await supabase
          .from('leads')
          .update({ workflow_stage: 'survey_complete' })
          .eq('id', leadId);
      } else if (finalStatus === 'in_progress') {
        await supabase
          .from('leads')
          .update({ workflow_stage: 'survey_in_progress' })
          .eq('id', leadId);
      }

      toast({
        title: 'Success',
        description: `Site survey ${existingSurvey ? 'updated' : 'created'} successfully${finalStatus === 'completed' ? ' and marked as complete' : ''}`,
      });

      fetchExistingSurvey();
    } catch (error: any) {
      console.error('Error saving survey:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save survey',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteAndCreateProposal = async () => {
    const formData = getValues();
    await onSubmit(formData, true);
    
    if (completionStatus.isComplete && onCreateProposal) {
      const proposalData = mapSurveyToProposal(formData, leadData);
      onCreateProposal(proposalData, leadData);
    }
  };

  if (fetchingData) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator - Sticky on mobile */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:static sm:bg-transparent">
        <SurveyProgressIndicator status={completionStatus} />
      </div>

      <form onSubmit={handleSubmit((data) => onSubmit(data, false))} className="space-y-6">
        {/* Roof Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Roof Details
              {completionStatus.sections.roof.complete && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Information about the property's roof</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="roof_type">Roof Type *</Label>
                <Select onValueChange={(value) => setValue('roof_type', value)} value={watch('roof_type')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select roof type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pitched">Pitched</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.roof_type && <p className="text-sm text-destructive mt-1">{errors.roof_type.message}</p>}
              </div>

              <div>
                <Label htmlFor="roof_condition">Roof Condition *</Label>
                <Select onValueChange={(value) => setValue('roof_condition', value)} value={watch('roof_condition')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
                {errors.roof_condition && <p className="text-sm text-destructive mt-1">{errors.roof_condition.message}</p>}
              </div>

              <div>
                <Label htmlFor="roof_orientation">Roof Orientation *</Label>
                <Select onValueChange={(value) => setValue('roof_orientation', value)} value={watch('roof_orientation')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select orientation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="South">South</SelectItem>
                    <SelectItem value="South-East">South-East</SelectItem>
                    <SelectItem value="South-West">South-West</SelectItem>
                    <SelectItem value="East">East</SelectItem>
                    <SelectItem value="West">West</SelectItem>
                    <SelectItem value="North">North (not ideal)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="roof_pitch">Roof Pitch (degrees) *</Label>
                <Input {...register('roof_pitch')} type="number" step="1" placeholder="e.g., 30" className="w-full" />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="roof_material">Roof Material *</Label>
                <Select onValueChange={(value) => setValue('roof_material', value)} value={watch('roof_material')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Concrete tiles">Concrete tiles</SelectItem>
                    <SelectItem value="Clay tiles">Clay tiles</SelectItem>
                    <SelectItem value="Slate">Slate</SelectItem>
                    <SelectItem value="Metal">Metal</SelectItem>
                    <SelectItem value="Felt/Membrane">Felt/Membrane (flat)</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Analysis */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Environmental Analysis</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Shading and surrounding conditions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="shading_analysis">Shading Analysis</Label>
              <Select onValueChange={(value) => setValue('shading_analysis', value)} value={watch('shading_analysis')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select shading level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">No shading</SelectItem>
                  <SelectItem value="Minimal">Minimal (early morning/late evening only)</SelectItem>
                  <SelectItem value="Partial">Partial (some hours affected)</SelectItem>
                  <SelectItem value="Significant">Significant (major obstruction)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="nearby_obstructions">Nearby Obstructions</Label>
              <Textarea {...register('nearby_obstructions')} placeholder="Trees, chimneys, neighboring buildings..." rows={2} className="w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Electrical System */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Electrical System
              {completionStatus.sections.electrical.complete && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Current electrical infrastructure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="electrical_panel_capacity">Panel Capacity *</Label>
                <Select onValueChange={(value) => setValue('electrical_panel_capacity', value)} value={watch('electrical_panel_capacity')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="40A">40A (older property)</SelectItem>
                    <SelectItem value="63A">63A (standard)</SelectItem>
                    <SelectItem value="80A">80A (modern)</SelectItem>
                    <SelectItem value="100A">100A (large property)</SelectItem>
                    <SelectItem value="3-phase">3-phase (commercial)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="electrical_panel_condition">Panel Condition *</Label>
                <Select onValueChange={(value) => setValue('electrical_panel_condition', value)} value={watch('electrical_panel_condition')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent (modern, compliant)</SelectItem>
                    <SelectItem value="good">Good (adequate)</SelectItem>
                    <SelectItem value="needs_upgrade">Needs Upgrade</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="meter_location">Meter Location</Label>
                <Input {...register('meter_location')} placeholder="e.g., Outside front, utility room" className="w-full" />
              </div>

              <div>
                <Label htmlFor="grid_connection_type">Grid Connection *</Label>
                <Select onValueChange={(value) => setValue('grid_connection_type', value)} value={watch('grid_connection_type')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single phase">Single phase</SelectItem>
                    <SelectItem value="Three phase">Three phase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Recommendations */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              System Recommendations
              {completionStatus.sections.recommendations.complete && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Proposed solar system specifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="recommended_system_size">System Size (kW) *</Label>
                <Input {...register('recommended_system_size')} type="number" step="0.1" placeholder="e.g., 6.5" className="w-full" />
              </div>

              <div>
                <Label htmlFor="recommended_panel_count">Panel Count *</Label>
                <Input {...register('recommended_panel_count')} type="number" placeholder="e.g., 16" className="w-full" />
              </div>

              <div>
                <Label htmlFor="estimated_installation_cost">Est. Cost (€)</Label>
                <Input {...register('estimated_installation_cost')} type="number" step="0.01" placeholder="e.g., 12000" className="w-full" />
              </div>
            </div>

            <div>
              <Label htmlFor="installation_notes">Installation Notes</Label>
              <Textarea {...register('installation_notes')} placeholder="Access requirements, scaffolding needs, special considerations..." rows={2} className="w-full" />
            </div>

            <div>
              <Label htmlFor="special_requirements">Special Requirements</Label>
              <Textarea {...register('special_requirements')} placeholder="Permits, planning permission, HOA restrictions..." rows={2} className="w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Photo Upload */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Site Photos
              {completionStatus.sections.photos.complete && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Upload photos of roof, electrical panel, meter ({completionStatus.sections.photos.count}/{completionStatus.sections.photos.required} minimum)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3" />
              {uploadingPhotos ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm text-muted-foreground">Uploading...</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-1">
                    {isDragActive ? 'Drop photos here' : 'Tap to add photos or drag & drop'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPEG, PNG, WebP (max 5MB)
                  </p>
                </>
              )}
            </div>

            {uploadedPhotos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {uploadedPhotos.map((photo, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={photo.url}
                      alt={photo.description}
                      className="w-full h-full object-cover rounded-lg border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status & Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Label htmlFor="status" className="mb-2 block">Survey Status</Label>
                <Select onValueChange={(value) => setValue('status', value)} value={status}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed" disabled={!completionStatus.isComplete}>
                      Completed {!completionStatus.isComplete && `(${completionStatus.completionPercentage}%)`}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons - Mobile optimized */}
            <div className="mt-6 flex flex-col gap-3">
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                ) : (
                  <><Save className="mr-2 h-4 w-4" /> Save Survey</>
                )}
              </Button>

              {completionStatus.isComplete && onCreateProposal && (
                <Button
                  type="button"
                  onClick={handleCompleteAndCreateProposal}
                  disabled={loading}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Complete & Create Proposal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              {!completionStatus.isComplete && onCreateProposal && (
                <p className="text-sm text-muted-foreground text-center sm:text-left">
                  Complete all required fields ({completionStatus.completionPercentage}%) to create a proposal
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
