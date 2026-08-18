import Link from "next/link";

const WHATSAPP = "https://wa.me/923450088846";

/** Floating WhatsApp button, fixed bottom-right on every page. */
export default function WhatsAppButton() {
  return (
    <Link
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-[90] flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] p-3.5 shadow-lg transition-transform hover:scale-105"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden>
        <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
        <path d="M12 2a10 10 0 00-8.6 15.06L2 22l5.06-1.33A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.18-1.14l-.3-.18-3.1.81.83-3.02-.2-.31A8.2 8.2 0 1112 20.2z" />
      </svg>
    </Link>
  );
}
