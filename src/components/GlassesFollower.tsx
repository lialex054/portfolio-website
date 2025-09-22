"use client";

import { useEffect, useRef } from "react";

export default function GlassesFollower() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null); // New ref for the SVG element
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      const svg = svgRef.current; // Get the SVG element
      const leftPupil = leftPupilRef.current;
      const rightPupil = rightPupilRef.current;

      if (!container || !svg || !leftPupil || !rightPupil) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;

      const deltaX = e.clientX - containerCenterX;
      const deltaY = e.clientY - containerCenterY;

      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(6, Math.sqrt(deltaX * deltaX + deltaY * deltaY));

      const pupilX = 2 * distance * Math.cos(angle);
      const pupilY = 2 * distance * Math.sin(angle);

      // const skewX = (e.clientX - containerCenterX) / window.innerWidth * 10;
      const skewY = (e.clientY - containerCenterY) / window.innerHeight * 10; 
      const scaleX = e.clientX > window.innerWidth / 2 ? -1 : 1;

      leftPupil.style.transform = `translate(${pupilX * scaleX}px, ${pupilY}px)`;
      rightPupil.style.transform = `translate(${pupilX * scaleX}px, ${pupilY}px)`;
      
      // --- EDITED LOGIC ---
      // Apply the instant flip to the outer container
      container.style.transform = `scaleX(${scaleX})`;
      // Apply the smooth skew to the inner SVG
      svg.style.transform = `skewY(${skewY}deg)`;
      // --- END EDIT ---
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: 684,
        height: 336,
        pointerEvents: "none",
        zIndex: 10,
        opacity: 0.2,
        // The transition is now removed from this container
      }}
    >
      <svg
        ref={svgRef} // Assign the new ref here
        style={{
          // Move the transition here so it only affects the SVG's transform
          transition: "transform 0.3s ease-out",
        }}
        width="684"
        height="336"
        viewBox="0 0 342 187"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fillRule="evenodd" clipRule="evenodd" d="M150 0V43.9558C156.262 40.0934 163.523 38 171 38C178.477 38 185.738 40.0934 192 43.9558V0H211V30.109C224.736 14.702 244.735 5 267 5C308.421 5 342 38.5786 342 80C342 121.421 308.421 155 267 155C225.579 155 192 121.421 192 80C192 79.3313 192.009 78.6646 192.026 78H192V75.0942C191.371 70.545 189.275 66.2938 185.991 63.0093C182.015 59.0336 176.623 56.8 171 56.8C165.377 56.8 159.985 59.0336 156.009 63.0093C152.509 66.5098 150.359 71.1084 149.895 75.9955C149.965 77.3215 150 78.6566 150 80C150 100.958 141.404 119.907 127.546 133.516C128.331 138.732 130.133 143.763 132.87 148.317C136.649 154.603 142.067 159.742 148.544 163.182C155.022 166.623 162.313 168.236 169.637 167.848C176.961 167.46 184.042 165.086 190.119 160.98L195.211 168.517L195.717 169.266L200.809 176.803C198.021 178.686 195.09 180.322 192.049 181.7C185.329 184.744 178.073 186.523 170.647 186.917C159.862 187.488 149.124 185.113 139.586 180.046C130.048 174.979 122.069 167.411 116.504 158.154C114.167 154.266 112.292 150.141 110.905 145.863C100.241 151.689 88.0072 155 75 155C33.5786 155 0 121.421 0 80C0 38.5786 33.5786 5 75 5C97.265 5 117.264 14.702 131 30.109V0H150ZM19.5 80C19.5 110.652 44.3482 135.5 75 135.5C105.652 135.5 130.5 110.652 130.5 80C130.5 49.3482 105.652 24.5 75 24.5C44.3482 24.5 19.5 49.3482 19.5 80ZM267 135.5C297.652 135.5 322.5 110.652 322.5 80C322.5 49.3482 297.652 24.5 267 24.5C236.348 24.5 211.5 49.3482 211.5 80C211.5 110.652 236.348 135.5 267 135.5Z" fill="white"/>
        <circle ref={leftPupilRef} cx="75" cy="80" r="10" fill="#FFFFFF" />
        <circle ref={rightPupilRef} cx="267" cy="80" r="10" fill="#FFFFFF" />
      </svg>
    </div>
  );
}