/**
 * Standalone analyser page — no dashboard chrome, no login required.
 * Renders only the AIBillAnalyser widget for embedding from the marketing site.
 */
import { AIBillAnalyser } from "@/components/ai-analyser";

export default function Analyser() {
  return (
    <div className="min-h-screen bg-background">
      <AIBillAnalyser />
    </div>
  );
}
