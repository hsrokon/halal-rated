import { useEffect, useRef } from "react";
import * as THREE from "three";
import Typewriter from "typewriter-effect/dist/core";

export default function Banner() {
  const bannerRef = useRef(null);
  const effectRef = useRef(null);
  const welcomeRef = useRef(null);
  const mottoRef = useRef(null);

  useEffect(() => {
    // Load Vanta Fog background
    const script = document.createElement("script");
    script.src = "/js/vanta.fog.min.js";
    script.async = true;

    script.onload = () => {
      if (!effectRef.current && window.VANTA?.FOG) {
        effectRef.current = window.VANTA.FOG({
          el: bannerRef.current,
          THREE: THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          highlightColor: 0x3a9955,
          midtoneColor: 0x006939,
          lowlightColor: 0x003d22,
          baseColor: 0xf7f7f7,
        });
      }
    };

    document.body.appendChild(script);

    // Type "Welcome to Halal Rated." once, then show mottos
    const welcomeTypewriter = new Typewriter(welcomeRef.current, {
      loop: false,
      delay: 60,
    });

    welcomeTypewriter
      .pauseFor(300)
      .typeString("Welcome to Halal Rated.")
      .callFunction(() => {
        // Start motto typing after welcome completes
        const mottoTypewriter = new Typewriter(mottoRef.current, {
          loop: true,
          delay: 50,
          deleteSpeed: 30,
        });

        mottoTypewriter
          .pauseFor(1000)
          .typeString('Rated with Integrity. Trusted by the <strong style="color: #27ae60; background: rgba(255, 255, 255, 0.8); padding: 4px 8px; backdrop-filter: blur(2px);">Ummah!</strong>')
          .pauseFor(2000)
          .deleteAll()
          .typeString('Your Guide to <strong style="color: #27ae60; background: rgba(255, 255, 255, 0.8); padding: 4px 8px; backdrop-filter: blur(2px);">Verified Halal Choice.</strong>')
          .pauseFor(2000)
          .deleteAll()
          .typeString('A platform for <span style="color: #27ae60; background: rgba(255, 255, 255, 0.8); padding: 4px 8px; backdrop-filter: blur(2px);">authentic halal reviews.</span>')
          .pauseFor(2000)
          .deleteAll()
          .start();
      })
      .start();

    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={bannerRef}
      className="w-full h-[200px] md:h-[400px] lg:h-[400px] flex flex-col items-center justify-center text-white text-center px-4"
    >
      {/* Static Welcome text (after initial typing) */}
      <div ref={welcomeRef} className="text-2xl md:text-4xl lg:text-5xl font-bold"></div>

      {/* Rotating Motto below */}
      <div
        ref={mottoRef}
        className="mt-4 text-base md:text-2xl font-medium"
        dangerouslySetInnerHTML={{ __html: "" }} // Required for styled HTML
      ></div>
    </div>
  );
}
