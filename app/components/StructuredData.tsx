import {
  SITE_URL,
  ORGANIZER_NAME,
  ORGANIZER_EMAIL,
  ORGANIZER_SOCIALS,
  EVENT_NAME,
  EVENT_START_DATE,
  EVENT_END_DATE,
  EVENT_VENUE_NAME,
  EVENT_VENUE_ADDRESS,
  TICKET_TIERS,
  TICKET_SALE_START,
  RESERVATION_URL,
} from "@/lib/site";
import { FAQ_ITEMS } from "@/lib/faq";

export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: ORGANIZER_NAME,
        url: SITE_URL,
        email: ORGANIZER_EMAIL,
        sameAs: ORGANIZER_SOCIALS,
      },
      {
        "@type": "WebSite",
        name: EVENT_NAME,
        url: SITE_URL,
      },
      {
        "@type": "Event",
        name: EVENT_NAME,
        description:
          "The most prestigious grand ball of the year for Computer Science students. A Masquerade Grand Ball celebrating excellence, community, and the magic of the night.",
        startDate: EVENT_START_DATE,
        endDate: EVENT_END_DATE,
        eventAttendanceMode:
          "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: EVENT_VENUE_NAME,
          address: {
            "@type": "PostalAddress",
            ...EVENT_VENUE_ADDRESS,
          },
        },
        image: `${SITE_URL}/opengraph-image`,
        organizer: {
          "@type": "Organization",
          name: ORGANIZER_NAME,
          url: SITE_URL,
        },
        performer: {
          "@type": "PerformingGroup",
          name: "To Be Announced",
        },
        offers: TICKET_TIERS.map((tier) => ({
          "@type": "Offer",
          name: tier.name,
          price: String(tier.price),
          priceCurrency: "PHP",
          url: RESERVATION_URL,
          availability: "https://schema.org/InStock",
          validFrom: TICKET_SALE_START,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
