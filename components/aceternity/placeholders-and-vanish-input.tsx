import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  r: number;
  color: string;
};

type PlaceholdersAndVanishInputProps = {
  placeholders: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const CANVAS_SIZE = 800;
const ANIMATION_INTERVAL = 3000;
const PARTICLE_STEP = 8;

export const PlaceholdersAndVanishInput = ({
  placeholders,
  onChange,
  onSubmit,
}: PlaceholdersAndVanishInputProps) => {
  const [value, setValue] = useState("");
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startPlaceholderAnimation = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, ANIMATION_INTERVAL);
  }, [placeholders.length]);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "visible") {
      startPlaceholderAnimation();
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [startPlaceholderAnimation]);

  useEffect(() => {
    startPlaceholderAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange, startPlaceholderAnimation]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const input = inputRef.current;
    if (!canvas || !input) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    const styles = getComputedStyle(input);
    const fontSize = parseFloat(styles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${styles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const pixelData = imageData.data;
    const newParticles: Particle[] = [];

    for (let y = 0; y < CANVAS_SIZE; y++) {
      const rowIndex = 4 * y * CANVAS_SIZE;
      for (let x = 0; x < CANVAS_SIZE; x++) {
        const pixelIndex = rowIndex + 4 * x;
        if (
          pixelData[pixelIndex] !== 0 &&
          pixelData[pixelIndex + 1] !== 0 &&
          pixelData[pixelIndex + 2] !== 0
        ) {
          newParticles.push({
            x,
            y,
            r: 1,
            color: `rgba(${pixelData[pixelIndex]}, ${pixelData[pixelIndex + 1]}, ${
              pixelData[pixelIndex + 2]
            }, ${pixelData[pixelIndex + 3]})`,
          });
        }
      }
    }

    particlesRef.current = newParticles;
  }, [value]);

  useEffect(() => {
    drawCanvas();
  }, [value, drawCanvas]);

  const animateParticles = useCallback((startX: number) => {
    const animateFrame = (pos: number) => {
      requestAnimationFrame(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(pos, 0, CANVAS_SIZE, CANVAS_SIZE);
        const remainingParticles = particlesRef.current.filter((particle) => {
          if (particle.x < pos) return true;
          if (particle.r <= 0) return false;

          particle.x += Math.random() > 0.5 ? 1 : -1;
          particle.y += Math.random() > 0.5 ? 1 : -1;
          particle.r -= 0.05 * Math.random();

          ctx.beginPath();
          ctx.rect(particle.x, particle.y, particle.r, particle.r);
          ctx.fillStyle = particle.color;
          ctx.fill();

          return true;
        });

        particlesRef.current = remainingParticles;

        if (remainingParticles.length > 0) {
          animateFrame(pos - PARTICLE_STEP);
        } else {
          setValue("");
          setIsAnimating(false);
        }
      });
    };

    animateFrame(startX);
  }, []);

  const vanishAndSubmit = useCallback(() => {
    setIsAnimating(true);
    drawCanvas();

    if (value && inputRef.current) {
      const maxX = particlesRef.current.reduce((max, particle) => Math.max(max, particle.x), 0);
      animateParticles(maxX);
    }
  }, [value, drawCanvas, animateParticles]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanishAndSubmit();
    onSubmit(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isAnimating) {
      vanishAndSubmit();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isAnimating) {
      setValue(e.target.value);
      onChange(e);
    }
  };

  return (
    <form
      className={cn(
        "relative mx-auto h-12 w-full max-w-xl overflow-hidden rounded-full bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 dark:bg-zinc-800",
        value && "bg-gray-50"
      )}
      onSubmit={handleSubmit}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          "pointer-events-none absolute top-[20%] left-2 origin-top-left scale-50 transform pr-20 text-base invert filter sm:left-8 dark:invert-0",
          isAnimating ? "opacity-100" : "opacity-0"
        )}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative z-50 h-full w-full rounded-full border-none bg-transparent pr-20 pl-4 text-sm text-black focus:ring-0 focus:outline-none sm:pl-10 sm:text-base dark:text-white",
          isAnimating && "text-transparent dark:text-transparent"
        )}
      />
      <button
        type="submit"
        disabled={!value}
        className="absolute top-1/2 right-2 z-50 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black transition duration-200 disabled:bg-gray-100 dark:bg-zinc-900 dark:disabled:bg-zinc-800"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-gray-300"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            d="M5 12l14 0"
            initial={{ strokeDasharray: "50%", strokeDashoffset: "50%" }}
            animate={{ strokeDashoffset: value ? 0 : "50%" }}
            transition={{ duration: 0.3, ease: "linear" }}
          />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </motion.svg>
      </button>
      <div className="pointer-events-none absolute inset-0 flex items-center rounded-full">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              key={`placeholder-${currentPlaceholder}`}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3, ease: "linear" }}
              className="w-[calc(100%-2rem)] truncate pl-4 text-left text-sm font-normal text-neutral-500 sm:pl-12 sm:text-base dark:text-zinc-500"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};
