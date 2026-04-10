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

  const title = `Privacy Policy | Renewable ${county.name}`;
  const description = `Read the privacy policy for Renewable ${county.name}. Learn how we collect, use, and protect your personal data in compliance with GDPR and data protection law.`;
  const url = `https://${county.domain}/privacy-policy`;

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

export default async function PrivacyPolicyPage({ params }: Props) {
  const { county: slug } = await params;
  const county = getCounty(slug);
  if (!county) notFound();

  const dpcName = county.country === "GB"
    ? "Information Commissioner's Office (ICO)"
    : "Data Protection Commission (DPC)";
  const dpcAddress = county.country === "GB"
    ? "Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF, United Kingdom"
    : "21 Fitzwilliam Square South, Dublin 2, D02 RK28, Ireland";
  const dpcWebsite = county.country === "GB"
    ? "https://ico.org.uk"
    : "https://www.dataprotection.ie";
  const dpcEmail = county.country === "GB"
    ? "casework@ico.org.uk"
    : "info@dataprotection.ie";
  const dpcPhone = county.country === "GB"
    ? "0303 123 1113"
    : "+353 21 765 5300";
  const regulatorRef = county.country === "GB"
    ? "UK General Data Protection Regulation (UK GDPR)"
    : "General Data Protection Regulation (EU) 2016/679 and the Data Protection Act 2018";

  return (
    <div className={sharedStyles.countySite}>
      <a href="#main-content" className={sharedStyles.skipLink}>
        Skip to main content
      </a>
      <TopBar phone={county.phone} email={county.email} accreditation={county.accreditation} />
      <CountyNav countyName={county.name} countySlug={county.slug} />

      <header className={styles.legalHero} id="main-content" role="banner" aria-labelledby="pp-heading">
        <div className="container">
          <h1 id="pp-heading" className={sharedStyles.headingH1} style={{ color: "var(--secondary-dark)" }}>
            Privacy Policy
          </h1>
          <p className={sharedStyles.heroSubtitle} style={{ color: "var(--text-mid)", maxWidth: 700 }}>
            How Renewable {county.name} collects, uses, and protects your personal information.
          </p>
        </div>
      </header>

      <section className={styles.legalPage} aria-labelledby="pp-content-heading">
        <div className="container">
          <div className={styles.legalContent}>
            <h2 id="pp-content-heading" className={sharedStyles.headingH2}>
              1. Introduction and Who We Are
            </h2>
            <p className={styles.lastUpdated}>Last updated: 1 January 2025</p>
            <p>
              Renewable {county.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, store, and disclose personal information when you use our website at{" "}
              <a href={`https://${county.domain}`}>{county.domain}</a>, when you contact us by telephone or email, when we carry out a site survey at your property, and when we provide solar panel installation and related services to you.
            </p>
            <p>
              For the purposes of {regulatorRef}, we are the data controller of your personal information. Our registration details are as follows:
            </p>
            <ul>
              <li><strong>Company name:</strong> Renewable {county.name}</li>
              <li><strong>Registered address:</strong> {county.mainTown}, County {county.name}, {county.country === "GB" ? "Northern Ireland, United Kingdom" : "Ireland"}</li>
              <li><strong>Contact email:</strong> <a href={`mailto:${county.email}`}>{county.email}</a></li>
              <li><strong>Contact phone:</strong> <a href={`tel:${county.phone}`}>{county.phone}</a></li>
              <li><strong>Website:</strong> <a href={`https://${county.domain}`}>{county.domain}</a></li>
            </ul>
            <p>
              If you have any questions about this Privacy Policy, please contact our Data Protection Officer at{" "}
              <a href={`mailto:${county.email}`}>{county.email}</a> or by writing to the registered address above.
            </p>

            <h2 className={sharedStyles.headingH2}>
              2. What Personal Data We Collect
            </h2>
            <p>We collect and process the following categories of personal information in connection with our services:</p>
            <h3 className={sharedStyles.headingH3}>2.1 Information You Provide Directly</h3>
            <ul>
              <li><strong>Name and contact details</strong> — your full name, postal address, Eircode or postcode, telephone number, and email address when you fill in a form on our website, request a quote, or contact us by phone or email.</li>
              <li><strong>Property information</strong> — details about your property including address, roof type, roof orientation, existing electrical system, and any photographs taken during a site survey.</li>
              <li><strong>Utility information</strong> — copies of electricity bills, meter point reference numbers (MPRN/MPAN), energy consumption data, and tariff information you provide to help us size your solar system accurately.</li>
              <li><strong>Financial information</strong> — payment details necessary to process deposits and invoices. We do not store full card numbers; payment processing is handled by our payment service provider.</li>
              <li><strong>Grant application data</strong> — information required for SEAI grant applications, ECO scheme applications, or other government incentive programmes, including your BER rating details if applicable.</li>
              <li><strong>Survey responses and feedback</strong> — any information you provide through customer satisfaction surveys, reviews, or feedback forms.</li>
            </ul>

            <h3 className={sharedStyles.headingH3}>2.2 Information We Collect Automatically</h3>
            <ul>
              <li><strong>Website usage data</strong> — when you visit our website, we may collect your IP address, browser type and version, operating system, referral source, pages visited, time spent on each page, and interaction patterns.</li>
              <li><strong>Cookies and tracking technologies</strong> — we use cookies and similar technologies to improve your browsing experience and analyse how our website is used. See Section 10 for full details.</li>
              <li><strong>Device information</strong> — when you use our monitoring app or online portal, we may collect device identifiers, operating system version, and app usage data.</li>
            </ul>

            <h3 className={sharedStyles.headingH3}>2.3 Information from Third Parties</h3>
            <ul>
              <li><strong>SEAI records</strong> — if you have previously registered with the Sustainable Energy Authority of Ireland, we may receive confirmation of your grant eligibility status.</li>
              <li><strong>Energy supplier data</strong> — with your consent, we may request information from your energy supplier regarding your consumption history.</li>
              <li><strong>Credit reference agencies</strong> — in limited circumstances, we may carry out credit checks when offering certain payment plan options.</li>
            </ul>

            <h2 className={sharedStyles.headingH2}>
              3. How and Why We Use Your Personal Data
            </h2>
            <p>
              We process your personal data only when we have a lawful basis to do so. Under {regulatorRef}, the lawful bases we rely on are set out below. Each processing activity is listed alongside the specific legal basis on which it is based, as required by GDPR Article 6:
            </p>

            <table>
              <thead>
                <tr>
                  <th>Purpose</th>
                  <th>Legal Basis</th>
                  <th>GDPR Article 6 Basis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Providing solar installation quotes and services</td>
                  <td>Contract performance — we need your data to perform the contract you have entered into with us, or to take steps at your request before entering into a contract.</td>
                  <td>Article 6(1)(b)</td>
                </tr>
                <tr>
                  <td>Processing grant applications on your behalf</td>
                  <td>Contract performance and legitimate interest — we process grant data to fulfil our contractual obligations and to secure available financial incentives for you.</td>
                  <td>Article 6(1)(b) &amp; (f)</td>
                </tr>
                <tr>
                  <td>Communicating with you about your installation</td>
                  <td>Contract performance and legitimate interest — we contact you regarding scheduling, progress updates, and aftercare support.</td>
                  <td>Article 6(1)(b) &amp; (f)</td>
                </tr>
                <tr>
                  <td>Processing payments and invoices</td>
                  <td>Contract performance and legal obligation — payment processing is necessary to fulfil our contract and comply with tax and accounting regulations.</td>
                  <td>Article 6(1)(b) &amp; (c)</td>
                </tr>
                <tr>
                  <td>Responding to enquiries and providing customer support</td>
                  <td>Legitimate interest — responding to pre-contractual enquiries is in our legitimate business interest and in your interest as a potential customer.</td>
                  <td>Article 6(1)(f)</td>
                </tr>
                <tr>
                  <td>Sending marketing communications</td>
                  <td>Consent — we only send marketing emails or messages where you have explicitly opted in. You can withdraw consent at any time.</td>
                  <td>Article 6(1)(a)</td>
                </tr>
                <tr>
                  <td>Improving our website and services</td>
                  <td>Legitimate interest — anonymised analytics data helps us understand how our website is used so we can improve it.</td>
                  <td>Article 6(1)(f)</td>
                </tr>
                <tr>
                  <td>Complying with legal obligations</td>
                  <td>Legal obligation — we may process data to comply with health and safety regulations, tax law, consumer protection law, and other applicable legal requirements.</td>
                  <td>Article 6(1)(c)</td>
                </tr>
                <tr>
                  <td>Establishing, exercising, or defending legal claims</td>
                  <td>Legitimate interest — we may process data where necessary for the establishment, exercise, or defence of legal claims.</td>
                  <td>Article 6(1)(f)</td>
                </tr>
              </tbody>
            </table>

            <h2 className={sharedStyles.headingH2}>
              4. Who We Share Your Data With
            </h2>
            <p>
              We do not sell your personal data to any third party. We may share your information with the following categories of recipients only where necessary to provide our services or where required by law:
            </p>
            <ul>
              <li><strong>SEAI (Sustainable Energy Authority of Ireland)</strong> — we share your name, address, property details, and installation data with SEAI to process grant applications and register installations on the national database.</li>
              <li><strong>SolarPilot and other certification bodies</strong> — installation details may be shared with certification and registration bodies as required by our accreditation obligations.</li>
              <li><strong>{county.accreditation} (Microgeneration Certification Scheme / SEAI)</strong> — certification data as required for system registration and compliance.</li>
              <li><strong>Energy suppliers</strong> — with your explicit consent, we may share data with your energy supplier to arrange grid connection notifications, Smart Export Guarantee registration, or SEG tariff applications.</li>
              <li><strong>Payment service providers</strong> — financial data necessary to process payments is shared with our PCI DSS compliant payment processor.</li>
              <li><strong>Analytics providers</strong> — anonymised website usage data may be processed by Google Analytics. IP addresses are anonymised before processing. See Section 10 for details.</li>
              <li><strong>Scaffolding and subcontractors</strong> — we may share your address and contact details with trusted subcontractors engaged to perform installation work at your property.</li>
              <li><strong>Legal and regulatory authorities</strong> — we may disclose your data if required to do so by law, by a court order, or by any governmental or regulatory authority.</li>
            </ul>
            <p>
              All third-party service providers are bound by Data Processing Agreements that require them to process your data only in accordance with our instructions and to maintain appropriate security measures.
            </p>

            <h2 className={sharedStyles.headingH2}>
              5. Data Retention — How Long We Keep Your Data
            </h2>
            <p>
              We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. Our specific retention periods are as follows:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Data Category</th>
                  <th>Retention Period</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Quotation enquiries and lead data</td>
                  <td>12 months from last contact</td>
                  <td>Legitimate interest in maintaining prospective customer records</td>
                </tr>
                <tr>
                  <td>Customer contracts and correspondence</td>
                  <td>7 years from installation completion</td>
                  <td>Compliance with tax legislation, warranty obligations, and limitation periods</td>
                </tr>
                <tr>
                  <td>Grant application records</td>
                  <td>7 years from grant approval</td>
                  <td>SEAI retention requirements and audit compliance</td>
                </tr>
                <tr>
                  <td>Payment and invoice records</td>
                  <td>7 years from transaction date</td>
                  <td>Statutory requirements under tax and companies legislation</td>
                </tr>
                <tr>
                  <td>Warranty and service records</td>
                  <td>Duration of warranty period + 3 years</td>
                  <td>To honour warranty obligations and support guarantee claims</td>
                </tr>
                <tr>
                  <td>Website analytics data</td>
                  <td>26 months</td>
                  <td>Industry standard for website analytics (Google Analytics default)</td>
                </tr>
                <tr>
                  <td>CCTV footage (if applicable)</td>
                  <td>30 days</td>
                  <td>Security purposes, in accordance with data protection guidance</td>
                </tr>
                <tr>
                  <td>Marketing consent records</td>
                  <td>Until consent is withdrawn</td>
                  <td>To demonstrate lawful consent and honour opt-out requests</td>
                </tr>
              </tbody>
            </table>
            <p>
              When your data is no longer required, it will be securely deleted or anonymised in accordance with our data retention procedures.
            </p>

            <h2 className={sharedStyles.headingH2}>
              6. Your Data Subject Rights
            </h2>
            <p>
              Under {regulatorRef}, you have the following rights in relation to your personal data. We are committed to facilitating the exercise of these rights and will respond to any request within one month of receipt.
            </p>
            <ol>
              <li>
                <strong>Right of access (Article 15)</strong> — You have the right to obtain confirmation that we are processing your personal data, and to access a copy of that data along with supplementary information about how we process it. To exercise this right, contact us at <a href={`mailto:${county.email}`}>{county.email}</a>.
              </li>
              <li>
                <strong>Right to rectification (Article 16)</strong> — You have the right to have any inaccurate personal data corrected and any incomplete personal data completed. Contact us at <a href={`mailto:${county.email}`}>{county.email}</a> to request corrections.
              </li>
              <li>
                <strong>Right to erasure (Article 17)</strong> — You have the right to have your personal data deleted in certain circumstances, including where the data is no longer necessary, where you withdraw consent, or where you successfully object to processing. Note that we may be required to retain certain data to comply with legal obligations.
              </li>
              <li>
                <strong>Right to restriction of processing (Article 18)</strong> — You have the right to request that we restrict the processing of your personal data in certain circumstances, such as where you contest the accuracy of the data or where processing is unlawful but you prefer restriction over erasure.
              </li>
              <li>
                <strong>Right to data portability (Article 20)</strong> — You have the right to receive your personal data in a structured, commonly used, and machine-readable format, and to transmit that data to another data controller. This right applies to data you have provided to us directly.
              </li>
              <li>
                <strong>Right to object (Article 21)</strong> — You have the right to object to our processing of your personal data based on legitimate interests or for direct marketing purposes. We will cease processing for direct marketing immediately upon receipt of an objection.
              </li>
              <li>
                <strong>Rights relating to automated decision-making (Article 22)</strong> — You have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal or similarly significant effects. We do not use automated decision-making in relation to our services.
              </li>
            </ol>
            <p>
              To exercise any of these rights, please contact us at <a href={`mailto:${county.email}`}>{county.email}</a> or write to us at our registered address. We may request proof of identity before processing your request. We will respond to your request within one month. This period may be extended by a further two months for complex requests, in which case we will notify you within the first month.
            </p>

            <h2 className={sharedStyles.headingH2}>
              7. Cookies and Tracking Technologies
            </h2>
            <p>
              Our website uses cookies and similar tracking technologies to provide and improve our services. When you first visit our website, you will be presented with a cookie consent banner that allows you to accept or customise the cookies we use.
            </p>
            <p>We use the following categories of cookies:</p>
            <ul>
              <li><strong>Strictly necessary cookies</strong> — these cookies are essential for the operation of our website and cannot be disabled. They include session cookies and security-related cookies.</li>
              <li><strong>Analytics cookies</strong> — we use Google Analytics to understand how visitors interact with our website. Analytics data is anonymised and we do not use it to identify individual users. Google Analytics sets cookies that last up to 2 years.</li>
              <li><strong>Functionality cookies</strong> — these cookies remember your preferences and settings to improve your experience, such as remembering your county or preferred language.</li>
              <li><strong>Marketing cookies</strong> — with your consent, we may use marketing cookies from platforms such as Google Ads and Meta (Facebook) to show you relevant advertisements and measure the effectiveness of our campaigns.</li>
            </ul>
            <p>
              You can manage your cookie preferences at any time through the cookie consent banner, by clearing cookies in your browser settings, or by visiting{" "}
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a> for more information. Please note that disabling certain cookies may affect the functionality of our website.
            </p>

            <h2 className={sharedStyles.headingH2}>
              8. Data Security
            </h2>
            <p>
              We take the security of your personal data seriously and implement appropriate technical and organisational measures to protect it against unauthorised access, alteration, disclosure, or destruction. Our security measures include:
            </p>
            <ul>
              <li>SSL/TLS encryption for all data transmitted through our website</li>
              <li>Secure, password-protected access to customer databases</li>
              <li>Regular security reviews and vulnerability assessments</li>
              <li>Staff training on data protection and information security</li>
              <li>Physical security measures for any paper records</li>
              <li>Access controls limiting data access to authorised personnel only</li>
              <li>Regular data backups stored in secure, encrypted environments</li>
            </ul>
            <p>
              While we strive to protect your personal data, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security but are committed to maintaining industry-standard protections.
            </p>

            <h2 className={sharedStyles.headingH2}>
              9. Data Breach Notification
            </h2>
            <p>
              In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will notify the {dpcName} within 72 hours of becoming aware of the breach, as required by GDPR Article 33. Where the breach is likely to result in a high risk to your rights and freedoms, we will also notify you directly without undue delay.
            </p>
            <p>
              Our data breach response procedure includes: (a) containing and assessing the breach, (b) identifying affected individuals and data, (c) notifying the supervisory authority where required, (d) notifying affected individuals where required, and (e) implementing measures to prevent recurrence.
            </p>

            <h2 className={sharedStyles.headingH2}>
              10. International Data Transfers
            </h2>
            <p>
              {county.country === "GB"
                ? "As we are based in Northern Ireland, your data may be transferred to the Republic of Ireland in connection with SEAI grant processing and group operations. Such transfers are covered by the UK-EU Trade and Cooperation Agreement, which provides for adequate data protection safeguards."
                : "As we are based in Ireland, your data is processed primarily within the European Economic Area (EEA). In some cases, we may transfer data to service providers located outside the EEA. Where this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission, to protect your data."
              }
            </p>
            <p>
              Data processed by Google Analytics may be transferred to the United States. Google provides adequate safeguards through its participation in the EU-US Data Privacy Framework. For more information, see{" "}
              <a href="https://privacy.google.com/businesses/compliance/" target="_blank" rel="noopener noreferrer">Google's privacy documentation</a>.
            </p>

            <h2 className={sharedStyles.headingH2}>
              11. Third-Party Data Processors
            </h2>
            <p>
              We engage the following categories of third-party data processors to assist in providing our services. Each processor is bound by a written Data Processing Agreement that sets out their obligations:
            </p>
            <ul>
              <li><strong>Website hosting and infrastructure</strong> — our website is hosted by a secure cloud provider with ISO 27001 certification.</li>
              <li><strong>Payment processing</strong> — card payments are processed by a PCI DSS Level 1 compliant payment service provider.</li>
              <li><strong>Analytics services</strong> — Google Analytics processes anonymised website usage data under our instructions.</li>
              <li><strong>Email and communication services</strong> — our email communications are handled by secure email service providers.</li>
              <li><strong>CRM and customer management</strong> — customer data is stored in a secure CRM system with role-based access controls.</li>
            </ul>

            <h2 className={sharedStyles.headingH2}>
              12. Data Protection Impact Assessments
            </h2>
            <p>
              Where our data processing is likely to result in a high risk to your rights and freedoms, we carry out a Data Protection Impact Assessment (DPIA) in accordance with GDPR Article 35. DPIAs are conducted for new processing activities that involve systematic monitoring, large-scale processing of special category data, or new technologies.
            </p>
            <p>
              We maintain a DPIA register and these assessments are reviewed annually or whenever there is a material change to the processing activity. If you would like further information about a specific DPIA, please contact our Data Protection Officer.
            </p>

            <h2 className={sharedStyles.headingH2}>
              13. Your Right to Lodge a Complaint
            </h2>
            <p>
              You have the right to lodge a complaint with the supervisory authority if you believe that our processing of your personal data infringes {regulatorRef}. We would encourage you to contact us first so that we can attempt to resolve your concern, but you are not required to do so.
            </p>
            <p>
              <strong>{dpcName}</strong><br />
              Address: {dpcAddress}<br />
              Website: <a href={dpcWebsite} target="_blank" rel="noopener noreferrer">{dpcWebsite}</a><br />
              Email: <a href={`mailto:${dpcEmail}`}>{dpcEmail}</a><br />
              Phone: {dpcPhone}
            </p>

            <h2 className={sharedStyles.headingH2}>
              14. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, changes in applicable law, or for other operational reasons. The updated version will be published on this page with a revised &quot;last updated&quot; date. We encourage you to review this page periodically to stay informed about how we protect your data.
            </p>
            <p>
              Where we make material changes to this Privacy Policy that affect how we use your personal data, we will notify you by email (where we have your email address) or by displaying a prominent notice on our website.
            </p>

            <h2 className={sharedStyles.headingH2}>
              15. Contact Us
            </h2>
            <p>
              If you have any questions, concerns, or requests relating to this Privacy Policy or our handling of your personal data, please contact us:
            </p>
            <ul>
              <li><strong>By email:</strong> <a href={`mailto:${county.email}`}>{county.email}</a></li>
              <li><strong>By phone:</strong> <a href={`tel:${county.phone}`}>{county.phone}</a></li>
              <li><strong>By post:</strong> Renewable {county.name}, {county.mainTown}, County {county.name}, {county.country === "GB" ? "Northern Ireland, United Kingdom" : "Ireland"}</li>
              <li><strong>Website:</strong> <a href={`https://${county.domain}`}>{county.domain}</a></li>
            </ul>
            <p>
              We aim to acknowledge all data protection enquiries within 5 working days and to provide a substantive response within one month, as required by law.
            </p>
          </div>
        </div>
      </section>

      <Footer county={county} />
    </div>
  );
}
