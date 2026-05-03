"use client";
import { useState, useRef, forwardRef } from "react";

type Moment = { timeRange: string; title: string; description: string };

type Act = {
  numeral: string;
  title: string;
  timeRange: string;
  mood: string;
  moments: Moment[];
};

const moments: Moment[] = [
  { timeRange: "3:20 – 5:00 PM", title: "Doors Open", description: "Find your seat and settle in." },
  { timeRange: "5:00 – 5:05 PM", title: "Opening Video", description: "Sit back as the night begins." },
  { timeRange: "5:05 – 5:10 PM", title: "Opening Ceremony", description: "Welcome to CS Night." },
  { timeRange: "5:10 – 5:20 PM", title: "Welcome & Program Overview", description: "What's in store for the evening." },
  { timeRange: "5:20 – 5:25 PM", title: "Opening Remarks", description: "A few words to kick off the night." },
  { timeRange: "5:25 – 5:35 PM", title: "Ice Breaker", description: "Get warmed up — prizes at stake!" },
  { timeRange: "5:35 – 5:40 PM", title: "Live Performance", description: "Enjoy a special musical number." },
  { timeRange: "5:40 – 6:20 PM", title: "Buffet Dinner", description: "Dig in — you've earned it." },
  { timeRange: "6:20 – 6:25 PM", title: "Post-Dinner Intermission", description: "A moment to mingle and refresh." },
  { timeRange: "6:25 – 6:35 PM", title: "Ice Breaker 2", description: "Another round of fun and games." },
  { timeRange: "6:35 – 7:05 PM", title: "Awarding Segment", description: "Celebrating our outstanding members." },
  { timeRange: "7:05 – 7:25 PM", title: "ACM Turnover Ceremony", description: "Passing the torch to the next batch." },
  { timeRange: "7:25 – 7:30 PM", title: "Cotillion", description: "A choreographed celebration." },
  { timeRange: "7:30 – 8:10 PM", title: "Dance Floor Opens", description: "The floor is yours — let loose!" },
  { timeRange: "8:10 – 8:20 PM", title: "Evening Intermission", description: "Catch your breath before the finale." },
  { timeRange: "8:20 – 8:25 PM", title: "Special Mentions", description: "Heartfelt shoutouts of the night." },
  { timeRange: "8:25 – 8:40 PM", title: "Best Couple & Group Outfit", description: "Who dressed to impress? Find out!" },
  { timeRange: "8:40 – 8:50 PM", title: "Raffle Draw", description: "Keep your ticket — you might win!" },
  { timeRange: "8:50 – 9:00 PM", title: "Closing Remarks", description: "A farewell to an unforgettable night." },
  { timeRange: "9:00 – 10:00 PM", title: "Safe Travels", description: "Head out safely — see you next time!" },
];

const actGroups: Act[] = [
  {
    numeral: "I",
    title: "The Welcome",
    timeRange: "3:20 – 5:35 PM",
    mood: "Doors open. The night begins.",
    moments: moments.slice(0, 6),
  },
  {
    numeral: "II",
    title: "The Feast & the Honours",
    timeRange: "5:35 – 7:30 PM",
    mood: "A feast, then the moments that matter.",
    moments: moments.slice(6, 13),
  },
  {
    numeral: "III",
    title: "After Dark",
    timeRange: "7:30 – 10:00 PM",
    mood: "Lights down, music up — the floor is yours.",
    moments: moments.slice(13, 20),
  },
];

export function ProgramFlow() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = (index: number) => {
    const next = openIndex === index ? null : index;
    setOpenIndex(next);
    if (next !== null && typeof window !== "undefined" && window.innerWidth < 768) {
      setTimeout(() => {
        cardRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  return (
    <section id="program" className="relative py-32 px-4 bg-[#0A1628] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <p
            className="text-xs uppercase tracking-[0.4em] mb-4"
            style={{ color: "#C89B3C", fontFamily: "Playfair Display, serif" }}
          >
            — June 27, 2026 —
          </p>
          <h2
            className="text-5xl md:text-7xl"
            style={{ fontFamily: "Playfair Display, serif", color: "#C89B3C", fontWeight: 700 }}
          >
            The Programme
          </h2>
          <p
            className="text-lg mt-6 italic"
            style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif", opacity: 0.7 }}
          >
            Twenty moments. One unforgettable evening.
          </p>
        </div>

        {/* Act cards — layout switches when one is open */}
        {openIndex === null ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actGroups.map((act, i) => (
              <ActCard
                key={act.numeral}
                act={act}
                index={i}
                isOpen={false}
                onToggle={handleToggle}
                ref={(el) => { cardRefs.current[i] = el; }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <ActCard
              act={actGroups[openIndex]}
              index={openIndex}
              isOpen={true}
              onToggle={handleToggle}
              ref={(el) => { cardRefs.current[openIndex] = el; }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {actGroups
                .map((act, i) => ({ act, i }))
                .filter(({ i }) => i !== openIndex)
                .map(({ act, i }) => (
                  <ActCard
                    key={act.numeral}
                    act={act}
                    index={i}
                    isOpen={false}
                    onToggle={handleToggle}
                    ref={(el) => { cardRefs.current[i] = el; }}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const ActCard = forwardRef<
  HTMLDivElement,
  { act: Act; index: number; isOpen: boolean; onToggle: (i: number) => void }
>(function ActCard({ act, index, isOpen, onToggle }, ref) {
  return (
    <div
      ref={ref}
      onClick={() => onToggle(index)}
      className={`
        group border cursor-pointer transition-all duration-300
        ${isOpen
          ? "border-[#C89B3C]/70"
          : "border-[#C89B3C]/40 md:hover:border-[#C89B3C]/70 md:hover:-translate-y-px"
        }
      `}
      style={{ background: "#0C1829" }}
    >
      {/* Card header — desktop */}
      <div className="hidden md:block px-8 pt-8 pb-0">
        <p
          className="text-7xl leading-none mb-4"
          style={{ fontFamily: "Playfair Display, serif", color: "#C89B3C" }}
        >
          {act.numeral}
        </p>
        <p
          className="text-xs uppercase tracking-[0.25em] mb-3"
          style={{ color: "#C89B3C", fontFamily: "Playfair Display, serif" }}
        >
          {act.timeRange}
        </p>
        <h3
          className="text-3xl mb-2 leading-snug"
          style={{ fontFamily: "Playfair Display, serif", color: "#C89B3C", fontWeight: 700 }}
        >
          {act.title}
        </h3>
        <p
          className="text-base italic"
          style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif", opacity: 0.7 }}
        >
          {act.mood}
        </p>
        <div className="border-t border-[#C89B3C]/30 mt-5 pt-4 pb-4 flex items-center justify-between">
          {!isOpen ? (
            <p className="text-xs tracking-wide" style={{ color: "#C89B3C", fontFamily: "Playfair Display, serif" }}>
              View moments ↓
            </p>
          ) : (
            <p
              className="text-xs tracking-wide"
              style={{ color: "#C89B3C", fontFamily: "Playfair Display, serif" }}
              onClick={(e) => { e.stopPropagation(); onToggle(index); }}
            >
              × Close
            </p>
          )}
        </div>
      </div>

      {/* Card header — mobile */}
      <div className="md:hidden px-6 py-6 flex items-start justify-between">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <p
            className="text-5xl leading-none shrink-0"
            style={{ fontFamily: "Playfair Display, serif", color: "#C89B3C" }}
          >
            {act.numeral}
          </p>
          <div className="min-w-0">
            <p
              className="text-xs uppercase tracking-[0.25em] mb-1"
              style={{ color: "#C89B3C", fontFamily: "Playfair Display, serif" }}
            >
              {act.timeRange}
            </p>
            <h3
              className="text-xl leading-snug"
              style={{ fontFamily: "Playfair Display, serif", color: "#C89B3C", fontWeight: 700 }}
            >
              {act.title}
            </h3>
            <p
              className="text-sm italic mt-1"
              style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif", opacity: 0.7 }}
            >
              {act.mood}
            </p>
          </div>
        </div>
        <span
          className={`text-xl shrink-0 ml-4 mt-1 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
          style={{ color: "#C89B3C" }}
        >
          ›
        </span>
      </div>

      {/* Expanded moment rows — animated with grid-rows trick */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-8 pb-8">
            {act.moments.map((moment, mi) => (
              <div
                key={mi}
                className="py-4 border-t border-[#C89B3C]/20 first:border-t-0"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Desktop moment row */}
                <div className="hidden md:flex items-baseline gap-4">
                  <p
                    className="text-xs uppercase tracking-[0.25em] shrink-0 w-36"
                    style={{ color: "#C89B3C", fontFamily: "Playfair Display, serif" }}
                  >
                    {moment.timeRange}
                  </p>
                  <div>
                    <p
                      className="text-base font-semibold"
                      style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif" }}
                    >
                      {moment.title}
                    </p>
                    <p
                      className="text-sm italic mt-0.5"
                      style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif", opacity: 0.6 }}
                    >
                      {moment.description}
                    </p>
                  </div>
                </div>
                {/* Mobile moment row */}
                <div className="md:hidden">
                  <p
                    className="text-xs uppercase tracking-[0.25em] mb-1"
                    style={{ color: "#C89B3C", fontFamily: "Playfair Display, serif" }}
                  >
                    {moment.timeRange}
                  </p>
                  <p
                    className="text-base font-semibold"
                    style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif" }}
                  >
                    {moment.title}
                  </p>
                  <p
                    className="text-sm italic mt-0.5"
                    style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif", opacity: 0.6 }}
                  >
                    {moment.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
