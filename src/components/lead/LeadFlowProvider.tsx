"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import type { SavingsResult } from "@/lib/savings-calculator";
import { calculateSavings } from "@/lib/savings-calculator";
import { countyFromEircode, isValidEircode, isValidUKPostcode, isNIPostcode, getCountryFromCounty } from "@/lib/eircode";

// ─── Types ───
export interface LeadFormData {
  // Step 1: Location
  postcode: string;
  county: string;
  country: "IE" | "GB";
  countyDetected: boolean;

  // Step 2: Energy Usage
  billAmount: string;
  billRange: string;
  homeType: string;

  // Step 3: Computed
  savingsResult: SavingsResult | null;

  // Step 4: Contact
  fullName: string;
  phone: string;
  email: string;
  address: string;
  surveyDate: string;
  surveyTime: string;
  notes: string;
}

export interface LeadFlowContextType {
  isOpen: boolean;
  currentStep: number;
  formData: LeadFormData;
  isSubmitting: boolean;
  submitResult: { success: boolean; reference?: string; message?: string } | null;
  direction: "forward" | "back";

  openLeadFlow: (initialData?: Partial<LeadFormData>) => void;
  closeLeadFlow: () => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<LeadFormData>) => void;
  detectCounty: (postcode: string) => void;
  computeSavings: () => void;
  submitLead: () => Promise<void>;
  resetFlow: () => void;
}

const initialFormData: LeadFormData = {
  postcode: "",
  county: "",
  country: "IE",
  countyDetected: false,
  billAmount: "",
  billRange: "",
  homeType: "",
  savingsResult: null,
  fullName: "",
  phone: "",
  email: "",
  address: "",
  surveyDate: "",
  surveyTime: "",
  notes: "",
};

// ─── Context ───
const LeadFlowContext = createContext<LeadFlowContextType | null>(null);

export function useLeadFlow(): LeadFlowContextType {
  const ctx = useContext(LeadFlowContext);
  if (!ctx) {
    throw new Error("useLeadFlow must be used within a LeadFlowProvider");
  }
  return ctx;
}

// ─── Provider ───
export function LeadFlowProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; reference?: string; message?: string } | null>(null);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const openLockRef = useRef(false);

  const openLeadFlow = useCallback((initialData?: Partial<LeadFormData>) => {
    if (openLockRef.current) return;
    openLockRef.current = true;
    setFormData((prev) => ({ ...initialFormData, ...initialFormData, ...prev }));
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    } else {
      setFormData(initialFormData);
    }
    setCurrentStep(1);
    setSubmitResult(null);
    setIsSubmitting(false);
    setDirection("forward");
    setIsOpen(true);
    // Prevent double-trigger
    setTimeout(() => {
      openLockRef.current = false;
    }, 300);
  }, []);

  const closeLeadFlow = useCallback(() => {
    setIsOpen(false);
  }, []);

  const goToStep = useCallback((step: number) => {
    setDirection(step > currentStep ? "forward" : "back");
    setCurrentStep(step);
  }, [currentStep]);

  const nextStep = useCallback(() => {
    if (currentStep < 4) {
      setDirection("forward");
      setCurrentStep((s) => s + 1);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setDirection("back");
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const updateFormData = useCallback((data: Partial<LeadFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const detectCounty = useCallback((postcode: string) => {
    const cleaned = postcode.toUpperCase().trim();

    if (isValidEircode(cleaned)) {
      const county = countyFromEircode(cleaned);
      if (county) {
        const country = getCountryFromCounty(county);
        setFormData((prev) => ({
          ...prev,
          postcode: cleaned,
          county,
          country,
          countyDetected: true,
        }));
        return;
      }
    }

    if (isValidUKPostcode(cleaned) && isNIPostcode(cleaned)) {
      setFormData((prev) => ({
        ...prev,
        postcode: cleaned,
        county: "",
        country: "GB",
        countyDetected: false,
      }));
      return;
    }

    // Unknown format or no match
    setFormData((prev) => ({
      ...prev,
      postcode: cleaned,
      county: "",
      country: "IE",
      countyDetected: false,
    }));
  }, []);

  const computeSavings = useCallback(() => {
    const billAmount = formData.billAmount
      ? parseFloat(formData.billAmount)
      : parseFloat(formData.billRange) || 150;

    const result = calculateSavings({
      billAmount,
      homeType: formData.homeType || "Detached House",
      county: formData.county || undefined,
      country: formData.country,
    });

    setFormData((prev) => ({
      ...prev,
      savingsResult: result,
      billAmount: String(billAmount),
    }));
  }, [formData.billAmount, formData.billRange, formData.homeType, formData.county, formData.country]);

  const submitLead = useCallback(async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postcode: formData.postcode,
          county: formData.county,
          country: formData.country,
          billAmount: formData.billAmount,
          homeType: formData.homeType,
          recommendedSystem: formData.savingsResult?.recommendedSystem,
          systemCost: formData.savingsResult?.costAfterGrant,
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          surveyDate: formData.surveyDate,
          surveyTime: formData.surveyTime,
          notes: formData.notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitResult({ success: true, reference: data.reference, message: data.message });
        setDirection("forward");
        setCurrentStep(5); // success step
      } else {
        setSubmitResult({ success: false, message: data.message || "Something went wrong. Please try again." });
      }
    } catch {
      setSubmitResult({ success: false, message: "Network error. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const resetFlow = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setSubmitResult(null);
    setIsSubmitting(false);
    setDirection("forward");
  }, []);

  // Listen for custom event from static HTML buttons
  React.useEffect(() => {
    function handleOpenEvent() {
      openLeadFlow();
    }

    window.addEventListener("open-lead-flow", handleOpenEvent);
    return () => window.removeEventListener("open-lead-flow", handleOpenEvent);
  }, [openLeadFlow]);

  // Escape key to close
  React.useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeLeadFlow();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeLeadFlow]);

  // Lock body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <LeadFlowContext.Provider
      value={{
        isOpen,
        currentStep,
        formData,
        isSubmitting,
        submitResult,
        direction,
        openLeadFlow,
        closeLeadFlow,
        goToStep,
        nextStep,
        prevStep,
        updateFormData,
        detectCounty,
        computeSavings,
        submitLead,
        resetFlow,
      }}
    >
      {children}
    </LeadFlowContext.Provider>
  );
}
