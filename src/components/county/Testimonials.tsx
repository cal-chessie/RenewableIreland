import styles from "@/app/counties/[county]/page.module.css";
import type { Testimonial } from "@/data/counties";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.testimonialStars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={styles.testimonialStar}
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke={i < rating ? "none" : "currentColor"}
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  countyName: string;
}

export default function Testimonials({ testimonials, countyName }: TestimonialsProps) {
  return (
    <section
      className={`${styles.section} ${styles.testimonialsSection}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Customer Reviews</div>
          <h2 id="testimonials-heading">
            What Our Customers in {countyName} Say
          </h2>
          <p>
            Real reviews from real {countyName} homeowners and businesses
            who have switched to solar.
          </p>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <article key={index} className={styles.testimonialCard}>
              <StarRating rating={testimonial.rating} />
              <p className={styles.testimonialText}>
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div>
                <span className={styles.testimonialAuthor}>
                  {testimonial.name}
                </span>
                <span className={styles.testimonialLocation}>
                  {" "}&mdash; {testimonial.location}, {countyName}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
