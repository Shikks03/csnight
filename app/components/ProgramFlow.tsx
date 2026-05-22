"use client";
import { useState, useRef, forwardRef, useCallback } from "react";
import { Reveal } from "./Reveal";

type Moment = { timeRange: string; title: string; description: string };

type Act = {
  numeral: string;
  title: string;
  timeRange: string;
  mood: string;
  moments: Moment[];
};

const moments: Moment[] = [
  { timeRange: "3:00 – 4:30 PM", title: "Doors Open", description: "Find your seat and settle in." },
  { timeRange: "4:30 – 5:00 PM", title: "Mini-Games", description: "Warm up with some fun and games before the night kicks off." },
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
    timeRange: "3:00 – 5:35 PM",
    mood: "Doors open. The night begins.",
    moments: moments.slice(0, 7),
  },
  {
    numeral: "II",
    title: "The Feast & the Honours",
    timeRange: "5:35 – 7:30 PM",
    mood: "A feast, then the moments that matter.",
    moments: moments.slice(7, 14),
  },
  {
    numeral: "III",
    title: "After Dark",
    timeRange: "7:30 – 10:00 PM",
    mood: "Lights down, music up — the floor is yours.",
    moments: moments.slice(14, 21),
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
    <section id="program" className="relative py-20 sm:py-28 md:py-40 px-4 overflow-hidden" style={{ background: "#0A1628" }}>
      {/* Ambient radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
          style={{
            background: "radial-gradient(ellipse at center top, rgba(200,155,60,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
          style={{
            background: "radial-gradient(ellipse at center bottom, rgba(200,155,60,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Heading */}
        <Reveal><div className="text-center mb-12 md:mb-20">
          <p
            className="text-[11px] tracking-[0.2em] sm:text-xs sm:tracking-[0.35em] mb-4"
            style={{ color: "#C89B3C", fontFamily: "Cinzel, serif" }}
          >
            — June 27, 2026 —
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-7xl"
            style={{ fontFamily: "Cinzel, serif", color: "#C89B3C", fontWeight: 700 }}
          >
            The Programme
          </h2>
          <p
            className="text-lg mt-6 italic"
            style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif", opacity: 0.7 }}
          >
            Twenty-one moments. One unforgettable evening.
          </p>
          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <div className="h-px w-24" style={{ background: "linear-gradient(to right, transparent, #C89B3C88)" }} />
            <div
              className="w-1.5 h-1.5 rotate-45 shrink-0"
              style={{ background: "#C89B3C" }}
            />
            <div className="h-px w-6" style={{ background: "#C89B3C88" }} />
            <div
              className="w-2 h-2 rotate-45 shrink-0"
              style={{ background: "#C89B3C" }}
            />
            <div className="h-px w-6" style={{ background: "#C89B3C88" }} />
            <div
              className="w-1.5 h-1.5 rotate-45 shrink-0"
              style={{ background: "#C89B3C" }}
            />
            <div className="h-px w-24" style={{ background: "linear-gradient(to left, transparent, #C89B3C88)" }} />
          </div>
        </div></Reveal>

        {/* Act cards */}
        <Reveal delay={0.15}>
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
        </Reveal>
      </div>
    </section>
  );
}

const ActCard = forwardRef<
  HTMLDivElement,
  { act: Act; index: number; isOpen: boolean; onToggle: (i: number) => void }
>(function ActCard({ act, index, isOpen, onToggle }, ref) {
  const [pressing, setPressing] = useState(false);

  const startPress = useCallback(() => setPressing(true), []);
  const endPress = useCallback(() => setPressing(false), []);

  return (
    <div
      ref={ref}
      onClick={() => onToggle(index)}
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
      onTouchStart={startPress}
      onTouchEnd={endPress}
      onTouchCancel={endPress}
      className="group relative cursor-pointer overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #0E1E36 0%, #0B1829 60%, #0A1628 100%)",
        border: pressing
          ? "1px solid rgba(200,155,60,0.9)"
          : isOpen
          ? "1px solid rgba(200,155,60,0.6)"
          : "1px solid rgba(200,155,60,0.2)",
        boxShadow: pressing
          ? "0 0 48px rgba(200,155,60,0.22), inset 0 1px 0 rgba(200,155,60,0.15)"
          : isOpen
          ? "0 0 40px rgba(200,155,60,0.12), inset 0 1px 0 rgba(200,155,60,0.08)"
          : "0 4px 24px rgba(0,0,0,0.3)",
        transform: pressing ? "scale(0.972)" : "scale(1)",
        transition: pressing
          ? "transform 80ms ease-out, border-color 60ms ease-out, box-shadow 60ms ease-out"
          : "transform 520ms cubic-bezier(0.34, 1.56, 0.64, 1), border-color 300ms ease, box-shadow 300ms ease",
        willChange: "transform",
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 60px rgba(200,155,60,0.04)" }}
      />

      {/* Press flash overlay — radial gold burst from center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(200,155,60,0.18) 0%, transparent 65%)",
          opacity: pressing ? 1 : 0,
          transition: pressing ? "opacity 60ms ease-out" : "opacity 500ms ease-out",
        }}
      />

      {/* Top gold accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: "linear-gradient(to right, transparent, rgba(200,155,60,0.6), transparent)",
          opacity: isOpen ? 1 : 0.3,
        }}
      />

      {/* Watermark numeral */}
      <div
        className="absolute right-4 top-2 select-none pointer-events-none leading-none transition-opacity duration-300 text-[5rem] md:text-[9rem]"
        style={{
          fontFamily: "Cinzel, serif",
          color: "#C89B3C",
          opacity: isOpen ? 0.05 : 0.04,
          lineHeight: 1,
        }}
      >
        {act.numeral}
      </div>

      {/* Card header — desktop */}
      <div className="hidden md:block px-8 pt-8 pb-0 relative">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-4"
          style={{ color: "rgba(200,155,60,0.7)", fontFamily: "Montserrat, sans-serif", letterSpacing: "0.3em" }}
        >
          Act {act.numeral}
        </p>
        <h3
          className="text-3xl mb-2 leading-snug"
          style={{ fontFamily: "Cinzel, serif", color: "#C89B3C", fontWeight: 700 }}
        >
          {act.title}
        </h3>
        <p
          className="text-sm italic mb-4"
          style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif", opacity: 0.6 }}
        >
          {act.mood}
        </p>

        {/* Time badge */}
        <div className="inline-flex items-center gap-2 mb-5">
          <div className="w-1 h-1 rounded-full" style={{ background: "#C89B3C" }} />
          <p
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "rgba(200,155,60,0.8)", fontFamily: "Montserrat, sans-serif" }}
          >
            {act.timeRange}
          </p>
        </div>

        <div
          className="border-t mt-0 mb-0 flex items-center justify-between py-4 transition-colors duration-300"
          style={{ borderColor: isOpen ? "rgba(200,155,60,0.3)" : "rgba(200,155,60,0.15)" }}
        >
          <span
            className="text-xs tracking-widest uppercase transition-colors duration-200"
            style={{
              color: "rgba(200,155,60,0.7)",
              fontFamily: "Montserrat, sans-serif",
              letterSpacing: "0.15em",
            }}
          >
            {isOpen ? "Close" : `${act.moments.length} moments`}
          </span>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
            style={{
              border: "1px solid rgba(200,155,60,0.4)",
              background: isOpen ? "rgba(200,155,60,0.12)" : "transparent",
            }}
            onClick={(e) => { if (isOpen) { e.stopPropagation(); onToggle(index); } }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                color: "#C89B3C",
                transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <path d="M1.5 3.5L5 7L8.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Card header — mobile */}
      <div className="md:hidden px-6 py-6 flex items-start justify-between relative">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <p
            className="text-4xl leading-none shrink-0 mt-0.5"
            style={{ fontFamily: "Cinzel, serif", color: "#C89B3C", opacity: 0.9 }}
          >
            {act.numeral}
          </p>
          <div className="min-w-0">
            <p
              className="text-xs uppercase tracking-[0.2em] mb-1"
              style={{ color: "rgba(200,155,60,0.7)", fontFamily: "Montserrat, sans-serif" }}
            >
              {act.timeRange}
            </p>
            <h3
              className="text-xl leading-snug"
              style={{ fontFamily: "Cinzel, serif", color: "#C89B3C", fontWeight: 700 }}
            >
              {act.title}
            </h3>
            <p
              className="text-sm italic mt-1"
              style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif", opacity: 0.6 }}
            >
              {act.mood}
            </p>
          </div>
        </div>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-3 mt-0.5 transition-all duration-300"
          style={{
            border: "1px solid rgba(200,155,60,0.4)",
            background: isOpen ? "rgba(200,155,60,0.12)" : "transparent",
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              color: "#C89B3C",
              transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <path d="M1.5 3.5L5 7L8.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Expanded moment rows */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: isOpen
            ? "grid-template-rows 450ms cubic-bezier(0.16, 1, 0.3, 1)"
            : "grid-template-rows 280ms cubic-bezier(0.4, 0, 1, 1)",
        }}
      >
        <div className="overflow-hidden">
          {/* Timeline container */}
          <div className="px-8 pb-8 relative">
            {/* Vertical timeline line */}
            <div
              className="absolute left-[2.85rem] top-0 bottom-8 w-px"
              style={{ background: "linear-gradient(to bottom, rgba(200,155,60,0.3), rgba(200,155,60,0.05))" }}
            />
            {act.moments.map((moment, mi) => (
              <div
                key={mi}
                className="relative pl-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-[1.15rem] w-2 h-2 rounded-full -translate-y-1/2"
                  style={{
                    background: "#0A1628",
                    border: "1px solid rgba(200,155,60,0.5)",
                    boxShadow: mi === 0 ? "0 0 6px rgba(200,155,60,0.3)" : "none",
                  }}
                />

                {/* Desktop row */}
                <div className="hidden md:flex items-start gap-5 py-3.5 border-t border-[rgba(200,155,60,0.08)] first:border-t-0">
                  <span
                    className="text-xs tracking-[0.15em] uppercase shrink-0 pt-0.5 w-36"
                    style={{ color: "rgba(200,155,60,0.65)", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {moment.timeRange}
                  </span>
                  <div>
                    <p
                      className="text-sm font-medium leading-snug"
                      style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif" }}
                    >
                      {moment.title}
                    </p>
                    <p
                      className="text-xs italic mt-0.5"
                      style={{ color: "#F5EDD8", fontFamily: "Montserrat, sans-serif", opacity: 0.45 }}
                    >
                      {moment.description}
                    </p>
                  </div>
                </div>

                {/* Mobile row */}
                <div className="md:hidden py-3.5 border-t border-[rgba(200,155,60,0.08)] first:border-t-0">
                  <p
                    className="text-xs uppercase tracking-[0.15em] mb-0.5"
                    style={{ color: "rgba(200,155,60,0.65)", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {moment.timeRange}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif" }}
                  >
                    {moment.title}
                  </p>
                  <p
                    className="text-xs italic mt-0.5"
                    style={{ color: "#F5EDD8", fontFamily: "Montserrat, sans-serif", opacity: 0.45 }}
                  >
                    {moment.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gold accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: "linear-gradient(to right, transparent, rgba(200,155,60,0.4), transparent)",
          opacity: isOpen ? 1 : 0,
        }}
      />
    </div>
  );
});
