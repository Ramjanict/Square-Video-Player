import { useEffect, useRef, useState } from "react";

const App = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [progress, setProgress] = useState(0); // 0 → 1
  const seekingRef = useRef(false);
  const [pointerProgress, setPointerProgress] = useState(0); // pointer position

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId: number;

    const update = () => {
      if (!seekingRef.current && video.duration > 0) {
        setProgress(video.currentTime / video.duration);
      }
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const containerSize = 400;
  const padding = 10;
  const width = containerSize - padding * 2;
  const height = containerSize - padding * 2;
  const perimeter = 2 * (width + height);
  const offset = perimeter - progress * perimeter;

  const handleBorderClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const video = videoRef.current;
    const svg = svgRef.current;
    if (!video || !svg || !video.duration) return;

    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let distance = 0;

    if (y <= padding + 20 && x >= padding && x <= width + padding) {
      distance = x - padding;
    } else if (
      x >= width + padding - 20 &&
      y >= padding &&
      y <= height + padding
    ) {
      distance = width + (y - padding);
    } else if (
      y >= height + padding - 20 &&
      x >= padding &&
      x <= width + padding
    ) {
      distance = width + height + (width - (x - padding));
    } else if (x <= padding + 20 && y >= padding && y <= height + padding) {
      distance = width + height + width + (height - (y - padding));
    }

    const newProgress = Math.min(Math.max(distance / perimeter, 0), 1);
    const targetTime = newProgress * video.duration;
    setPointerProgress(newProgress);

    const startTime = video.currentTime;
    const diff = targetTime - startTime;
    const duration = 0.3;
    const start = performance.now();

    seekingRef.current = true;

    const animateSeek = (now: number) => {
      const elapsed = (now - start) / 1000;
      const t = Math.min(elapsed / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      video.currentTime = startTime + diff * ease;
      setProgress(video.currentTime / video.duration);
      if (t < 1) {
        requestAnimationFrame(animateSeek);
      } else {
        seekingRef.current = false;
      }
    };

    requestAnimationFrame(animateSeek);
  };

  const pointerAngle = pointerProgress * 360;
  const radius = 200;
  const pointerX =
    200 + radius * Math.cos((pointerAngle - 90) * (Math.PI / 180));
  const pointerY =
    200 + radius * Math.sin((pointerAngle - 90) * (Math.PI / 180));

  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div className="relative w-[400px] h-[400px] bg-gray-100 rounded-[50px] flex justify-center items-center overflow-hidden">
        {/* SVG border */}
        <svg
          ref={svgRef}
          className="absolute inset-0 cursor-pointer"
          viewBox={`0 0 ${containerSize} ${containerSize}`}
          onClick={handleBorderClick}
        >
          {/* static border */}
          <rect
            x={padding}
            y={padding}
            width={width}
            height={height}
            rx="40"
            ry="40"
            stroke="#fecaca"
            strokeWidth="8"
            fill="none"
            opacity="0.3"
          />

          <rect
            x={padding}
            y={padding}
            width={width}
            height={height}
            rx="40"
            ry="40"
            stroke="red"
            strokeWidth="8"
            fill="none"
            strokeDasharray={perimeter}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.1s linear",
              filter: "drop-shadow(0 0 12px red)",
            }}
          />

          <rect
            x={pointerX - 6}
            y={pointerY - 1}
            width="12"
            height="12"
            rx="1"
            fill="#facc15"
            className="transition-all duration-300"
          />
        </svg>

        <video
          ref={videoRef}
          src="/demo.mp4"
          className="w-[340px] rounded-2xl relative z-10"
          controls
        />
      </div>
    </div>
  );
};

export default App;
