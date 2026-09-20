"use client";

import { useEffect, useState } from "react";

// Slides: add or remove file names here (files live in the public folder)
const slides = ["/hero.jpg", "/hero2.jpg", "/hero3.jpg"];
const INTERVAL = 5000; // milliseconds between slides

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative flex min-h-[calc(100svh-4rem)] items-end overflow-hidden"
      style={{ background: "radial-gradient(120% 90% at 70% 20%, #eceade 0%, #e2ddd0 45%, #d6cfbf 100%)" }}
    >
      {slides.map((src, i) => (
        <div
          key={src}
          aria-hidden
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url('${src}')`, opacity: i === index ? 1 : 0 }}
        />
      ))}

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-20">
        <div className="flex flex-col items-center text-center">
          <p className="tracking-nav text-[12px] text-black">THIS SEASON</p>
          <h2 className="mt-2 font-[family-name:var(--font-cormorant)] text-4xl leading-tight text-black md:text-6xl">
            Up to 50% Off
          </h2>
          <p className="mt-2 font-[family-name:var(--font-cormorant)] text-lg italic text-black">
            This Season Free Delivery Nationwide
          </p>

          <a href="#collections" className="tracking-nav mt-7 border border-black/70 bg-white/25 px-8 py-3 text-[13px] text-black backdrop-blur-sm transition-colors hover:bg-black hover:text-white">
            SHOP THE COLLECTIONS
          </a>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-2 w-2 rounded-full transition ${i === index ? "bg-black" : "bg-black/30"}`}
          />
        ))}
      </div>
    </section>
  );
}
