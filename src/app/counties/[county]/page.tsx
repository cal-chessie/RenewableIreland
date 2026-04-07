import { notFound } from "next/navigation";
import { getCounty, countySlugs } from "@/data/counties";
import styles from "./page.module.css";
import TopBar from "@/components/county/TopBar";
import CountyNav from "@/components/county/CountyNav";
import Hero from "@/components/county/Hero";
import BillUpload from "@/components/county/BillUpload";
import Services from "@/components/county/Services";
import TrustSection from "@/components/county/TrustSection";
import Testimonials from "@/components/county/Testimonials";
import FAQ from "@/components/county/FAQ";
import FinalCTA from "@/components/county/FinalCTA";
import Footer from "@/components/county/Footer";

type Props = {
  params: Promise<{ county: string }>;
};

export async function generateStaticParams() {
  return countySlugs.map((slug) => ({ county: slug }));
}

function generateLocalBusinessSchema(county: ReturnType<typeof getCounty>) {
  if (!county) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ElectricalContractor",
    name: `Solar ${county.name}`,
    description: `${county.accreditation} accredited solar panel installers serving ${county.name}`,
    url: `https://${county.domain}`,
    telephone: county.phone,
    email: county.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: county.mainTown,
      addressRegion: county.name,
      addressCountry: county.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: county.lat,
      longitude: county.lng,
    },
    areaServed: county.areaTowns.map((town) => ({
      "@type": "AdministrativeArea",
      name: town,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
    priceRange: county.country === "GB" ? "££" : "€€",
    image: `https://${county.domain}/images/og-image.jpg`,
    sameAs: [],
  };
}

function generateFAQSchema(county: ReturnType<typeof getCounty>) {
  if (!county) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: county.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function generateReviewSchema(county: ReturnType<typeof getCounty>) {
  if (!county || county.testimonials.length < 3) return null;
  const avgRating =
    county.testimonials.reduce((sum, t) => sum + t.rating, 0) /
    county.testimonials.length;
  return {
    "@context": "https://schema.org",
    "@type": "ElectricalContractor",
    name: `Solar ${county.name}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: String(county.testimonials.length),
    },
    review: county.testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(t.rating),
      },
      reviewBody: t.text,
    })),
  };
}

export default async function CountyHomePage({ params }: Props) {
  const { county: slug } = await params;
  const county = getCounty(slug);
  if (!county) notFound();

  const localBusinessSchema = generateLocalBusinessSchema(county);
  const faqSchema = generateFAQSchema(county);
  const reviewSchema = generateReviewSchema(county);

  return (
    <div className={styles.countySite}>
      {/* Skip link */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      {/* JSON-LD Structured Data */}
      {localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      {reviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(reviewSchema),
          }}
        />
      )}

      {/* Top Bar */}
      <TopBar
        phone={county.phone}
        email={county.email}
        accreditation={county.accreditation}
      />

      {/* Navigation */}
      <CountyNav countyName={county.name} countySlug={county.slug} />

      {/* Hero */}
      <Hero
        countyName={county.name}
        countySlug={county.slug}
        subtitle={county.heroSubtitle}
        phone={county.phone}
      />

      {/* Bill Upload */}
      <BillUpload countyName={county.name} countySlug={county.slug} />

      {/* Services */}
      <Services countyName={county.name} countySlug={county.slug} />

      {/* Trust / Why Us */}
      <TrustSection
        countyName={county.name}
        accreditation={county.accreditation}
        currency={county.currency}
        avgPaybackYears={county.avgPaybackYears}
      />

      {/* Testimonials */}
      <Testimonials
        testimonials={county.testimonials}
        countyName={county.name}
      />

      {/* FAQ */}
      <FAQ faqs={county.faqs} countyName={county.name} />

      {/* Final CTA */}
      <FinalCTA countyName={county.name} phone={county.phone} />

      {/* Footer */}
      <Footer county={county} />
    </div>
  );
}
