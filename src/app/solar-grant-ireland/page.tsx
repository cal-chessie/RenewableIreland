import type { Metadata } from "next";

const title = "Solar PV Grant in Ireland: 2026 Guide | Renewable Ireland";
const description = "A clear guide to the current SEAI Solar PV grant: values, eligibility and the steps to take before work starts.";
const url = "https://renewableireland.ie/solar-grant-ireland";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article" },
};

const faqs = [
  ["What is the maximum SEAI Solar PV grant?", "The domestic Solar PV grant is capped at €1,800 for a 4kWp system or above."],
  ["How is the Solar PV grant calculated?", "The grant is €700 per kWp for the first 2kWp, then €200 per additional kWp up to 4kWp."],
  ["Do I need an MPRN?", "Yes. SEAI states that an eligible home must have an MPRN and must not have received previous Solar PV funding at that MPRN."],
  ["When should I apply?", "Apply and obtain grant approval before works begin. SEAI says approval must be in place before proceeding with the installation."],
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function SolarGrantIrelandPage() {
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "96px 24px 64px", fontFamily: "Arial, sans-serif", lineHeight: 1.65 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <p style={{ color: "#4f7f30", fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", fontSize: 13 }}>Renewable Ireland guide</p>
      <h1 style={{ fontSize: "clamp(36px, 7vw, 58px)", lineHeight: 1.04, margin: "0 0 20px" }}>Solar PV grant in Ireland: the clear version</h1>
      <p style={{ fontSize: 20, maxWidth: 700 }}>The current domestic SEAI Solar PV grant is worth up to €1,800. It can reduce the cost of a qualifying home solar installation, but it is not a quote and eligibility must be confirmed before work begins.</p>

      <section>
        <h2>Current grant values</h2>
        <ul>
          <li>€700 per kWp for the first 2kWp.</li>
          <li>€200 per additional kWp up to 4kWp.</li>
          <li>Maximum grant: €1,800.</li>
        </ul>
        <p>For example, SEAI lists €1,400 for 2kWp, €1,600 for 3kWp and €1,800 for 4kWp solar panels.</p>
      </section>

      <section>
        <h2>Before you make a decision</h2>
        <ol>
          <li>Check that the home has an MPRN.</li>
          <li>Check that it was built and occupied before 2021.</li>
          <li>Check that the MPRN has not previously received Solar PV grant support.</li>
          <li>Choose a contractor and apply for grant approval before works begin.</li>
          <li>Use the survey and written proposal to confirm system size, price, roof suitability and the right next step.</li>
        </ol>
      </section>

      <section>
        <h2>What this page does not tell you</h2>
        <p>The grant does not determine whether a particular roof is suitable, what a complete installation will cost, or how much electricity a home will save. Those depend on the property, energy use, design and proposal. Treat any online estimate as a starting point until it is reviewed.</p>
      </section>

      <section>
        <h2>Questions homeowners ask</h2>
        {faqs.map(([question, answer]) => <div key={question}><h3>{question}</h3><p>{answer}</p></div>)}
      </section>

      <hr style={{ margin: "40px 0", border: 0, borderTop: "1px solid #ddd" }} />
      <p><strong>Source and date checked:</strong> 29 August 2026 against the <a href="https://www.seai.ie/grants/home-energy-grants/individual-grants/solar-electricity-grant" target="_blank" rel="noreferrer">SEAI Solar Electricity Grant guidance</a>. Grant rules can change; always check SEAI before committing to works.</p>
      <p><a href="/#get-started">Start a Renewable Ireland enquiry</a></p>
    </main>
  );
}
