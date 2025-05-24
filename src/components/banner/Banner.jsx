import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Banner() {
  const bannerRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/js/vanta.fog.min.js"; // path relative to /public
    script.async = true;

    script.onload = () => {
      if (!vantaEffect && window.VANTA && window.VANTA.FOG) {
        const effect =window.VANTA.FOG({
        el: bannerRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,

        // 🎨 Brand-aligned colors
        highlightColor: 0x5bb36f, // lighter green (movement glow)
        midtoneColor: 0x006939,   // your primary green
        lowlightColor: 0x003d22,  // even darker tone (fog depth)
        baseColor: 0xf7f7f7       // soft background to match logo BG
        });

        setVantaEffect(effect);
      }
    };

    document.body.appendChild(script);

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div
  ref={bannerRef}
  className="w-full mx-auto h-[500px] md:h-[600px] lg:h-[40rem] flex items-center justify-center text-white text-4xl font-bold"
>
  Welcome to HalalRated!
</div>

  );
}
