import { useState, useEffect, useRef } from 'react';

// Custom Hook: Animated counter using IntersectionObserver
// useEffect: Sets up IntersectionObserver to detect when element enters viewport
export default function useCountUp(target, suffix = '', duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = (target / duration) * 16;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    // useEffect cleanup: Disconnect observer to prevent memory leaks
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref, display: `${count}${suffix}` };
}
