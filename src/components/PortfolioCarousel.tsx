import Link from "next/link";
import { useEffect, useRef } from "react";
import { portfolio } from "@/data/portfolio";
import { assetPath } from "@/lib/paths";

/** Each set is repeated so the loop has enough content to fill wide screens. */
const SET_COPIES = 4;
const LOOP_DISTANCE_PERCENT = 100 / SET_COPIES;
const SCROLL_DURATION_MS = 45_000;
const RESUME_DELAY_MS = 2_000;
const DRAG_THRESHOLD_PX = 6;

const PortfolioCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const sets = Array.from({ length: SET_COPIES }, (_, index) => index);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let animation: Animation | null = null;
    let resumeTimer: number | null = null;
    let drag: {
      pointerId: number;
      startX: number;
      startTime: number;
      moved: boolean;
    } | null = null;
    let suppressClick = false;
    let msPerPixel = 0;
    let lastPointerDownAt = 0;

    const measure = () => {
      const loopWidth = track.scrollWidth / SET_COPIES;
      msPerPixel = loopWidth > 0 ? SCROLL_DURATION_MS / loopWidth : 0;
    };

    const clearResumeTimer = () => {
      if (resumeTimer !== null) {
        window.clearTimeout(resumeTimer);
        resumeTimer = null;
      }
    };

    const scheduleResume = () => {
      clearResumeTimer();
      resumeTimer = window.setTimeout(() => {
        resumeTimer = null;
        animation?.play();
      }, RESUME_DELAY_MS);
    };

    const startAnimation = () => {
      if (reduceMotion.matches) {
        return;
      }

      if (!animation) {
        animation = track.animate(
          [
            { transform: "translateX(0)" },
            { transform: `translateX(-${LOOP_DISTANCE_PERCENT}%)` },
          ],
          {
            duration: SCROLL_DURATION_MS,
            iterations: Infinity,
            easing: "linear",
          }
        );
      }

      animation.play();
    };

    const getCurrentTime = () => {
      const currentTime = animation?.currentTime;
      return typeof currentTime === "number" ? currentTime : 0;
    };

    const normalizeTime = (time: number) => {
      const wrapped = time % SCROLL_DURATION_MS;
      return wrapped < 0 ? wrapped + SCROLL_DURATION_MS : wrapped;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (
        reduceMotion.matches ||
        !animation ||
        (event.pointerType === "mouse" && event.button !== 0)
      ) {
        return;
      }

      measure();

      if (msPerPixel === 0) {
        return;
      }

      clearResumeTimer();
      animation.pause();
      suppressClick = false;
      lastPointerDownAt = performance.now();
      drag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startTime: getCurrentTime(),
        moved: false,
      };
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!drag || !animation || event.pointerId !== drag.pointerId) {
        return;
      }

      const deltaX = event.clientX - drag.startX;

      if (Math.abs(deltaX) > DRAG_THRESHOLD_PX) {
        drag.moved = true;
      }

      animation.currentTime = normalizeTime(
        drag.startTime - deltaX * msPerPixel
      );
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.pointerId) {
        return;
      }

      const deltaX = event.clientX - drag.startX;
      const moved = drag.moved || Math.abs(deltaX) > DRAG_THRESHOLD_PX;

      if (event.type === "pointerup" && moved && animation) {
        animation.currentTime = normalizeTime(
          drag.startTime - deltaX * msPerPixel
        );
      }

      suppressClick = event.type === "pointerup" && moved;
      drag = null;
      scheduleResume();
    };

    const handleWindowBlur = () => {
      if (!drag) {
        return;
      }

      drag = null;
      scheduleResume();
    };

    const handleClick = (event: MouseEvent) => {
      if (!suppressClick) {
        return;
      }

      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    };

    const handleFocusIn = () => {
      // Pointer-driven focus (e.g. tapping a card) should still resume after release.
      if (performance.now() - lastPointerDownAt < 500) {
        return;
      }

      clearResumeTimer();
      animation?.pause();
    };

    const handleFocusOut = (event: FocusEvent) => {
      const nextTarget = event.relatedTarget as Node | null;

      if (!nextTarget || !container.contains(nextTarget)) {
        scheduleResume();
      }
    };

    const handleMotionPreferenceChange = () => {
      if (reduceMotion.matches) {
        clearResumeTimer();
        animation?.cancel();
        animation = null;
        return;
      }

      measure();
      startAnimation();
    };

    measure();
    startAnimation();

    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerEnd);
    window.addEventListener("pointercancel", handlePointerEnd);
    window.addEventListener("blur", handleWindowBlur);
    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("click", handleClick, true);
    container.addEventListener("focusin", handleFocusIn);
    container.addEventListener("focusout", handleFocusOut);
    reduceMotion.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      clearResumeTimer();
      animation?.cancel();
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerEnd);
      window.removeEventListener("pointercancel", handlePointerEnd);
      window.removeEventListener("blur", handleWindowBlur);
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("click", handleClick, true);
      container.removeEventListener("focusin", handleFocusIn);
      container.removeEventListener("focusout", handleFocusOut);
      reduceMotion.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mt-10 cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing motion-reduce:cursor-default motion-reduce:touch-auto motion-reduce:overflow-x-auto"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-ink to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-ink to-transparent sm:w-20" />

      <ul
        ref={trackRef}
        className="flex w-max will-change-transform motion-reduce:transform-none"
      >
        {sets.map((set) =>
          portfolio.map((piece) => {
            const isDuplicate = set > 0;

            return (
              <li
                key={`${set}-${piece.src}`}
                aria-hidden={isDuplicate || undefined}
                className={`mr-1 w-[78vw] max-w-[360px] shrink-0 sm:w-[320px] ${
                  isDuplicate ? "motion-reduce:hidden" : ""
                }`}
              >
                <Link
                  href="/portfolio"
                  tabIndex={isDuplicate ? -1 : undefined}
                  draggable={false}
                  className="group/card block overflow-hidden border border-white/10 bg-white/[0.03]"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-bone">
                    <img
                      src={assetPath(piece.src)}
                      alt={piece.alt}
                      loading="lazy"
                      draggable={false}
                      className="h-full w-full object-cover transition duration-700 group-hover/card:scale-[1.03]"
                    />
                  </div>
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default PortfolioCarousel;
