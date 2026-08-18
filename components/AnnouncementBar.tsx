/**
 * Thin announcement bar that sits above the nav.
 * Marquee-style scrolling text; duplicated content makes the loop seamless.
 */
const messages = [
  "UP TO 50% OFF — LIMITED TIME",
  "FREE DELIVERY FOR THE FIRST 500 CUSTOMERS",
  "CASH ON DELIVERY AVAILABLE NATIONWIDE",
  "1,000+ HAPPY CUSTOMERS",
];

export default function AnnouncementBar() {
  const line = messages.join("   •   ");
  return (
    <div className="overflow-hidden bg-[var(--charcoal)] py-2">
      <div className="animate-marquee whitespace-nowrap">
        <span className="tracking-nav text-[11px] text-[var(--ivory)]">
          {line}   •   {line}   •   
        </span>
        <span className="tracking-nav text-[11px] text-[var(--ivory)]">
          {line}   •   {line}   •   
        </span>
      </div>
    </div>
  );
}
