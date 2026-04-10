import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCounty, countySlugs } from "@/data/counties";
import styles from "./page.module.css";
import sharedStyles from "../page.module.css";
import TopBar from "@/components/county/TopBar";
import CountyNav from "@/components/county/CountyNav";
import Footer from "@/components/county/Footer";

type Props = {
  params: Promise<{ county: string }>;
};

export async function generateStaticParams() {
  return countySlugs.map((slug) => ({ county: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county: slug } = await params;
  const county = getCounty(slug);
  if (!county) return {};

  const title = `Terms & Conditions | Renewable ${county.name}`;
  const description = `Read the terms and conditions for Renewable ${county.name}. Important information about our solar panel installation services, warranties, payment terms, and your rights.`;
  const url = `https://${county.domain}/terms`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: `Renewable ${county.name}`,
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { county: slug } = await params;
  const county = getCounty(slug);
  if (!county) notFound();

  const governingLaw = county.country === "GB"
    ? "these terms and conditions shall be governed by and construed in accordance with the laws of England and Wales, and any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales."
    : "these terms and conditions shall be governed by and construed in accordance with the laws of the Republic of Ireland, and any disputes shall be subject to the exclusive jurisdiction of the courts of Ireland.";
  const consumerRef = county.country === "GB"
    ? "the Consumer Rights Act 2015, the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013"
    : "the Consumer Protection Act 2007, the European Communities (Unfair Terms in Consumer Contracts) Regulations 1995, and the European Union (Consumer Rights) Regulations 2013";
  const grantBody = county.country === "GB"
    ? "The Smart Export Guarantee (SEG) is administered by energy suppliers licensed by Ofgem. Eligibility for SEG payments depends on your chosen energy supplier and their specific tariff terms."
    : "SEAI grants are administered by the Sustainable Energy Authority of Ireland and are subject to SEAI's terms and conditions, available at seai.ie. Grant eligibility, amounts, and availability may change without notice. Solar " + county.name + " does not guarantee the availability or amount of any grant.";

  return (
    <div className={sharedStyles.countySite}>
      <a href="#main-content" className={sharedStyles.skipLink}>
        Skip to main content
      </a>
      <TopBar phone={county.phone} email={county.email} accreditation={county.accreditation} />
      <CountyNav countyName={county.name} countySlug={county.slug} />

      <header className={styles.legalHero} id="main-content" role="banner" aria-labelledby="tc-heading">
        <div className="container">
          <h1 id="tc-heading" className={sharedStyles.headingH1} style={{ color: "var(--secondary-dark)" }}>
            Terms &amp; Conditions
          </h1>
          <p className={sharedStyles.heroSubtitle} style={{ color: "var(--text-mid)", maxWidth: 700 }}>
            The terms and conditions governing the solar panel installation services provided by Renewable {county.name}.
          </p>
        </div>
      </header>

      <section className={styles.legalPage} aria-labelledby="tc-content-heading">
        <div className="container">
          <div className={styles.legalContent}>
            <h2 id="tc-content-heading" className={sharedStyles.headingH2}>
              1. Company Information
            </h2>
            <p className={styles.lastUpdated}>Last updated: 1 January 2025</p>
            <p>
              These terms and conditions (&quot;Terms&quot;) govern the provision of solar panel installation and related services by Renewable {county.name} (&quot;the Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) to you (&quot;the Customer&quot;, &quot;you&quot;, or &quot;your&quot;). Please read these Terms carefully before engaging our services.
            </p>
            <ul>
              <li><strong>Company name:</strong> Renewable {county.name}</li>
              <li><strong>CRO / Companies House registration:</strong> [Registration Number — available on request]</li>
              <li><strong>Registered address:</strong> {county.mainTown}, County {county.name}, {county.country === "GB" ? "Northern Ireland, United Kingdom" : "Ireland"}</li>
              <li><strong>Contact email:</strong> <a href={`mailto:${county.email}`}>{county.email}</a></li>
              <li><strong>Contact phone:</strong> <a href={`tel:${county.phone}`}>{county.phone}</a></li>
              <li><strong>Website:</strong> <a href={`https://${county.domain}`}>{county.domain}</a></li>
            </ul>

            <h2 className={sharedStyles.headingH2}>
              2. Definitions and Interpretation
            </h2>
            <p>In these Terms, the following expressions have the meanings set out below:</p>
            <ul>
              <li><strong>&quot;Contract&quot;</strong> means the agreement between the Company and the Customer for the provision of Services, formed upon acceptance of a Quotation.</li>
              <li><strong>&quot;Customer&quot;</strong> means the individual, business, or organisation who engages the Company to provide Services.</li>
              <li><strong>&quot;Equipment&quot;</strong> means the solar panels, inverters, batteries, mounting systems, wiring, monitoring systems, and any other materials installed by the Company as part of the Services.</li>
              <li><strong>&quot;Grant&quot;</strong> means any financial incentive, subsidy, or payment scheme offered by SEAI, government bodies, energy suppliers, or other organisations that may be available to the Customer.</li>
              <li><strong>&quot;Installation&quot;</strong> means the work carried out by the Company to install the Equipment at the Customer&apos;s Property.</li>
              <li><strong>&quot;Quotation&quot;</strong> means the written quotation provided by the Company to the Customer specifying the Services to be provided, the Equipment to be installed, and the total price.</li>
              <li><strong>&quot;Services&quot;</strong> means the solar panel installation, consultation, site survey, design, commissioning, maintenance, and any other services provided by the Company.</li>
              <li><strong>&quot;Property&quot;</strong> means the premises at which the Installation is to be carried out, as specified in the Quotation.</li>
            </ul>

            <h2 className={sharedStyles.headingH2}>
              3. Scope of Services
            </h2>
            <p>Renewable {county.name} provides the following solar energy services to residential, commercial, and agricultural customers:</p>
            <ul>
              <li><strong>Residential solar panel installation</strong> — design, supply, and installation of solar photovoltaic (PV) systems for domestic properties, including roof-mounted and ground-mounted systems.</li>
              <li><strong>Commercial solar panel installation</strong> — design, supply, and installation of solar PV systems for offices, warehouses, retail units, and commercial premises.</li>
              <li><strong>Agricultural solar panel installation</strong> — design, supply, and installation of solar PV systems for farm buildings, dairy parlours, grain stores, and agricultural operations.</li>
              <li><strong>Battery storage systems</strong> — supply and installation of energy storage batteries compatible with new and existing solar installations.</li>
              <li><strong>EV charger installation</strong> — supply and installation of electric vehicle charge points, including integration with solar PV systems.</li>
              <li><strong>Solar maintenance and servicing</strong> — panel cleaning, electrical safety inspections, inverter checks, performance analysis, and repair services.</li>
              <li><strong>Consultation and site survey</strong> — pre-installation assessment of property suitability, roof condition, energy usage, and system sizing recommendations.</li>
            </ul>
            <p>
              All services are provided in accordance with the applicable {county.accreditation} standards and current building regulations.
            </p>

            <h2 className={sharedStyles.headingH2}>
              4. Quotation and Pricing
            </h2>
            <ol>
              <li>All quotations are provided in writing and are valid for a period of <strong>30 days</strong> from the date of issue unless otherwise stated.</li>
              <li>Our quotation constitutes a fixed-price offer. Unless the scope of work changes due to circumstances identified after acceptance, the price quoted will not be increased.</li>
              <li>The quoted price includes all Equipment specified, scaffolding, installation labour, commissioning, {county.accreditation} registration, and connection to the Customer&apos;s electrical system.</li>
              <li>The quoted price excludes: groundworks or structural alterations to the Property, upgrade of the Customer&apos;s electrical consumer unit or fuse board (unless specifically included), tree surgery or chimney removal, and any additional works requested by the Customer after acceptance of the Quotation.</li>
              <li>VAT is included in all quoted prices at the applicable rate. The current reduced VAT rate for residential solar installations in the Republic of Ireland is 0%. For Northern Ireland, the current VAT rate is 5%.</li>
              <li>If additional work is required that was not anticipated at the time of quotation (for example, hidden structural defects or the need for electrical upgrades), we will inform the Customer and provide a revised quotation before proceeding. The Customer may accept or decline the additional work.</li>
            </ol>

            <h2 className={sharedStyles.headingH2}>
              5. 14-Day Cooling-Off Period
            </h2>
            <p>
              Under {consumerRef}, you have the right to cancel this Contract within 14 calendar days of the date you accepted our Quotation, without giving any reason and without incurring any penalty.
            </p>
            <p>To exercise your right to cancel, you must notify us in writing (by email or post) at the following address:</p>
            <ul>
              <li><strong>Email:</strong> <a href={`mailto:${county.email}`}>{county.email}</a></li>
              <li><strong>Post:</strong> Renewable {county.name}, {county.mainTown}, County {county.name}, {county.country === "GB" ? "Northern Ireland, United Kingdom" : "Ireland"}</li>
            </ul>
            <p>
              The cancellation period ends 14 days after the day on which the Contract is formed. If you cancel after installation work has commenced but before completion, you are liable to pay for the value of any work already carried out and for any Equipment that has been specifically ordered and cannot be returned.
            </p>
            <p>
              If you cancel before any work has commenced, any deposit paid will be refunded in full within 14 days of receiving your cancellation notice.
            </p>

            <h2 className={sharedStyles.headingH2}>
              6. Contract Formation and Acceptance
            </h2>
            <ol>
              <li>A Contract is formed when the Customer accepts the Company&apos;s Quotation, either by signing the acceptance form, by confirming acceptance in writing (including email), or by paying the deposit.</li>
              <li>The Company reserves the right to decline to accept a Quotation acceptance where the scope of work has changed, the Quotation has expired, or the Company has identified issues that preclude the proposed Installation.</li>
              <li>These Terms are incorporated into the Contract by reference and apply to the exclusion of any terms the Customer purports to apply.</li>
              <li>The Company may update these Terms from time to time. The version applicable to any Contract is the version in effect on the date the Contract was formed.</li>
            </ol>

            <h2 className={sharedStyles.headingH2}>
              7. Payment Terms
            </h2>
            <ol>
              <li><strong>Deposit:</strong> A deposit of 20% of the total quoted price is required upon acceptance of the Quotation. This confirms the Customer&apos;s commitment and allows us to order Equipment and schedule scaffolding.</li>
              <li><strong>Milestone payment:</strong> Where the total contract value exceeds {county.currency}10,000 or where the installation period exceeds 5 working days, an interim payment of 50% of the balance (less deposit) may be required upon delivery of Equipment to the Property.</li>
              <li><strong>Final payment:</strong> The remaining balance is due upon satisfactory completion of the Installation and commissioning of the system. We will notify the Customer when the system is ready for final inspection and payment.</li>
              <li><strong>Payment methods:</strong> We accept bank transfer, debit card, and credit card. Payments by credit card may be subject to a processing surcharge of up to 2%. We do not accept cash payments.</li>
              <li><strong>Late payment:</strong> If payment is not received within 14 days of the due date, we reserve the right to charge interest at the statutory rate applicable under the Late Payment of Commercial Debts legislation. For consumer customers, interest may be charged only where we have provided prior notice of our intention to do so.</li>
              <li><strong>Grant payments:</strong> Where a Grant is available and the Customer has authorised the Company to act as agent for the Grant application, the Customer remains responsible for the full contract price regardless of whether the Grant is approved or paid. Grant payments, when received, will be deducted from the Customer&apos;s outstanding balance or refunded to the Customer as applicable.</li>
            </ol>

            <h2 className={sharedStyles.headingH2}>
              8. Installation Timeline and Scheduling
            </h2>
            <ol>
              <li>We aim to carry out residential Installations within 4 to 6 weeks of Quotation acceptance, subject to scaffolding availability, weather conditions, and Equipment delivery times.</li>
              <li>Commercial and agricultural installations may take longer and will be scheduled by mutual agreement.</li>
              <li>We will provide the Customer with a proposed installation date at the time of deposit receipt. This date is indicative and may be adjusted due to weather, Equipment supply delays, or other factors beyond our reasonable control.</li>
              <li>We will provide at least 48 hours&apos; notice before attending the Property to carry out the Installation.</li>
              <li>The Customer acknowledges that solar Installation work is weather-dependent. If installation cannot proceed safely due to adverse weather, we will reschedule at the earliest available date at no additional cost.</li>
            </ol>

            <h2 className={sharedStyles.headingH2}>
              9. Customer Obligations
            </h2>
            <p>The Customer agrees to:</p>
            <ol>
              <li><strong>Provide safe roof access</strong> — ensure that the Company&apos;s installers have safe and unobstructed access to the roof and the area surrounding the Property for the placement of scaffolding.</li>
              <li><strong>Clear the work area</strong> — remove any items from the loft space or roof area that may impede the Installation, and ensure the area around the Property is clear for scaffolding erection.</li>
              <li><strong>Coordinate with utility providers</strong> — where required, arrange for the electricity supplier to carry out any necessary meter upgrades or grid connection work. The Company will advise on any such requirements.</li>
              <li><strong>Provide accurate information</strong> — ensure that all information provided to the Company regarding the Property, existing electrical system, energy usage, and grant eligibility is accurate and complete.</li>
              <li><strong>Secure permissions</strong> — obtain any necessary planning permissions, landlord consents, or other approvals required for the Installation. The Company will advise on typical requirements, but obtaining permissions remains the Customer&apos;s responsibility.</li>
              <li><strong>Ensure adequate electrical infrastructure</strong> — where the existing electrical consumer unit or wiring is inadequate for the proposed system, the Customer agrees to carry out or commission the necessary upgrades. The Company can arrange for this work at additional cost if requested.</li>
              <li><strong>Be present or arrange access</strong> — ensure that a responsible adult is present at the Property during the Installation to provide access and answer any questions.</li>
            </ol>

            <h2 className={sharedStyles.headingH2}>
              10. Warranty Terms
            </h2>
            <p>Renewable {county.name} provides the following warranties in respect of all Installations:</p>
            <ol>
              <li><strong>Solar panel performance warranty (25 years):</strong> All solar panels installed by the Company carry a manufacturer&apos;s linear performance warranty guaranteeing a minimum of 80% of original rated output at year 25. This warranty is provided by the panel manufacturer and is subject to their terms and conditions.</li>
              <li><strong>Solar panel product warranty (12 to 25 years):</strong> Panels are warranted against manufacturing defects for a minimum of 12 years from the date of installation. The specific warranty period depends on the panel manufacturer and model.</li>
              <li><strong>Workmanship warranty (10 years):</strong> Renewable {county.name} warrants all installation work — including mounting, wiring, flashing, weatherproofing, and connections — for a period of 10 years from the date of commissioning. This covers defects caused by faulty workmanship or materials supplied by us.</li>
              <li><strong>Inverter warranty (10 years):</strong> All inverters installed by the Company carry a minimum 10-year manufacturer&apos;s warranty. Some premium inverter models may offer extended warranties of 12 to 15 years.</li>
              <li><strong>Battery warranty (10 years):</strong> Battery storage systems carry a 10-year manufacturer&apos;s warranty covering capacity retention and manufacturing defects.</li>
              <li><strong>EV charger warranty (3 years):</strong> Electric vehicle charge points carry a minimum 3-year manufacturer&apos;s warranty.</li>
            </ol>

            <h2 className={sharedStyles.headingH2}>
              11. Guarantee Claims Process
            </h2>
            <p>To make a claim under any warranty or guarantee:</p>
            <ol>
              <li>Contact us in writing at <a href={`mailto:${county.email}`}>{county.email}</a> or by calling <a href={`tel:${county.phone}`}>{county.phone}</a>, describing the issue in as much detail as possible.</li>
              <li>Provide your installation reference number (found on your commissioning certificate), the date of installation, and a description of the fault or issue.</li>
              <li>We will acknowledge your claim within 3 working days and arrange for an inspection within 10 working days.</li>
              <li>If the fault is covered by warranty, we will carry out repairs or replacements at no cost to you, including labour and materials.</li>
              <li>If the fault is not covered by warranty (for example, accidental damage, unauthorised modification, or failure caused by third-party work), we will provide a quote for the repair work.</li>
              <li>Manufacturer warranty claims for panels, inverters, and batteries will be processed by us on your behalf. Resolution timelines depend on the manufacturer&apos;s processes, but we will keep you informed throughout.</li>
            </ol>

            <h2 className={sharedStyles.headingH2}>
              12. Cancellation and Refund Policy
            </h2>
            <p>In addition to your statutory 14-day cooling-off rights (see Section 5):</p>
            <ol>
              <li>If you wish to cancel after the cooling-off period but before Equipment has been ordered, we will refund your deposit in full less any administrative costs incurred.</li>
              <li>If you cancel after Equipment has been ordered but before installation has commenced, you will be liable for the cost of any Equipment ordered that cannot be returned to our suppliers. We will refund the balance of your deposit after deducting these costs.</li>
              <li>If you cancel after installation has commenced, you will be liable for the cost of all work carried out to date and all Equipment installed. We will provide a fair and reasonable assessment of costs incurred.</li>
              <li>Refunds will be processed within 14 days of the cancellation or completion assessment, whichever is applicable.</li>
            </ol>

            <h2 className={sharedStyles.headingH2}>
              13. Limitation of Liability
            </h2>
            <ol>
              <li>Nothing in these Terms shall limit or exclude the Company&apos;s liability for death or personal injury caused by negligence, or for fraud or fraudulent misrepresentation.</li>
              <li>Subject to the above, the Company&apos;s total liability to the Customer in contract, tort (including negligence), or otherwise arising out of or in connection with the Contract shall not exceed the total price paid by the Customer under the Contract.</li>
              <li>The Company shall not be liable for any indirect, consequential, or special loss or damage, including but not limited to loss of profits, loss of revenue, loss of data, loss of business opportunity, or wasted expenditure.</li>
              <li>The Company does not guarantee specific energy savings, generation figures, or payback periods. All performance estimates provided are based on industry-standard modelling and historical data and are indicative only. Actual performance will depend on weather conditions, roof orientation, shading, system maintenance, and energy usage patterns.</li>
              <li>The Company shall not be liable for delays or failures caused by circumstances beyond its reasonable control, including but not limited to adverse weather, Equipment supply chain disruptions, utility provider delays, or government policy changes.</li>
            </ol>

            <h2 className={sharedStyles.headingH2}>
              14. Force Majeure
            </h2>
            <p>
              Neither party shall be liable for any delay in performing or failure to perform its obligations under the Contract to the extent that such delay or failure is caused by circumstances beyond its reasonable control (&quot;Force Majeure Events&quot;). Force Majeure Events include: natural disasters, pandemics, war, terrorism, civil unrest, government actions (including changes to grant schemes or regulations), strikes or industrial action, shortages of materials or labour, failure of third-party service providers, and extreme weather conditions.
            </p>
            <p>
              If a Force Majeure Event prevents or delays performance for more than 60 days, either party may terminate the Contract by giving written notice. In such circumstances, the Customer will be refunded any payments made for work not yet carried out or Equipment not yet delivered.
            </p>

            <h2 className={sharedStyles.headingH2}>
              15. Dispute Resolution
            </h2>
            <ol>
              <li>In the event of any dispute arising out of or in connection with the Contract, the parties shall first attempt to resolve the matter through good-faith negotiation.</li>
              <li>If the dispute cannot be resolved through negotiation within 30 days, either party may refer the matter to mediation through a mutually agreed mediator.</li>
              <li>If mediation is unsuccessful, the dispute may be referred to {county.country === "GB" ? "arbitration in accordance with the Arbitration Act 1996" : "the Small Claims Procedure or appropriate court proceedings"}. Each party shall bear its own costs of mediation and arbitration.</li>
              <li>The Company is committed to resolving customer complaints fairly and promptly. If you have a complaint, please contact us in writing at <a href={`mailto:${county.email}`}>{county.email}</a>. We will acknowledge your complaint within 5 working days and provide a full response within 20 working days.</li>
            </ol>

            <h2 className={sharedStyles.headingH2}>
              16. SEAI Grant Terms and Conditions
            </h2>
            <p>Where the Customer has applied for an SEAI grant through the Company:</p>
            <ol>
              <li>{grantBody}</li>
              <li>The Customer authorises the Company to submit the grant application on their behalf and to act as their agent in all dealings with the relevant grant body.</li>
              <li>The Customer must provide all documentation required for the grant application in a timely manner, including proof of property ownership, BER assessment (if required), and any other information requested by the grant body.</li>
              <li>The Company does not guarantee the approval or amount of any grant. Grant decisions are made solely by the relevant grant body.</li>
              <li>If a grant is approved, payment may be made directly to the Company on the Customer&apos;s behalf, or to the Customer depending on the grant body&apos;s procedures. The Customer agrees to assign any grant payment to the Company to offset against the contract balance where applicable.</li>
            </ol>

            <h2 className={sharedStyles.headingH2}>
              17. Intellectual Property
            </h2>
            <ol>
              <li>All designs, drawings, specifications, and technical information provided by the Company remain the Company&apos;s intellectual property and may not be reproduced, shared, or used by the Customer for any purpose other than the Installation without the Company&apos;s prior written consent.</li>
              <li>The Company may use photographs of completed installations for marketing and portfolio purposes unless the Customer specifically requests otherwise in writing at the time of installation.</li>
              <li>The Renewable {county.name} name, logo, and branding are proprietary trademarks and may not be used by the Customer without prior written consent.</li>
            </ol>

            <h2 className={sharedStyles.headingH2}>
              18. Data Protection
            </h2>
            <p>
              The Company processes personal data in accordance with our Privacy Policy, available at{" "}
              <a href={`/counties/${county.slug}/privacy-policy`}>renewable{county.name}.ie/privacy-policy</a>. By entering into a Contract with us, you acknowledge that we will process your personal data for the purposes of performing the Contract, complying with legal obligations, and exercising our legitimate business interests.
            </p>

            <h2 className={sharedStyles.headingH2}>
              19. Changes to These Terms
            </h2>
            <p>
              The Company reserves the right to update these Terms from time to time. Changes will be effective from the date of publication on our website. The version of these Terms applicable to any Contract is the version in effect at the date the Contract is formed. We will not apply retrospective changes to existing Contracts.
            </p>
            <p>
              We encourage Customers to review these Terms periodically and to contact us if they have any questions.
            </p>

            <h2 className={sharedStyles.headingH2}>
              20. Governing Law
            </h2>
            <p>
              These Terms and any Contract formed under them shall be governed by and construed in accordance with the laws of{" "}
              {county.country === "GB" ? "England and Wales" : "the Republic of Ireland"}. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of{" "}
              {county.country === "GB" ? "England and Wales" : "Ireland"}.
            </p>
            <p>
              These Terms have been drafted in plain English and will be interpreted fairly and reasonably. If any provision of these Terms is found to be unenforceable or invalid, that provision shall be modified to the minimum extent necessary to make it valid and enforceable, and the remaining provisions shall continue in full force and effect.
            </p>

            <h2 className={sharedStyles.headingH2}>
              21. Contact Information
            </h2>
            <p>
              For any questions about these Terms and Conditions, or to discuss a Contract with Renewable {county.name}, please contact us:
            </p>
            <ul>
              <li><strong>By email:</strong> <a href={`mailto:${county.email}`}>{county.email}</a></li>
              <li><strong>By phone:</strong> <a href={`tel:${county.phone}`}>{county.phone}</a></li>
              <li><strong>By post:</strong> Renewable {county.name}, {county.mainTown}, County {county.name}, {county.country === "GB" ? "Northern Ireland, United Kingdom" : "Ireland"}</li>
              <li><strong>Website:</strong> <a href={`https://${county.domain}`}>{county.domain}</a></li>
            </ul>
          </div>
        </div>
      </section>

      <Footer county={county} />
    </div>
  );
}
