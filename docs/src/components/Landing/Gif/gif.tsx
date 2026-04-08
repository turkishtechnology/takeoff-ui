import styles from './gif.module.css';
import React, { useEffect, useRef, useState } from 'react';

const WORDS = ['core', 'react', 'vue', 'angular'];

export default function Gif() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => prev + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Seamless wrap: after transitioning to the clone at the end,
  // snap back to the real first item without transition
  useEffect(() => {
    if (index === WORDS.length) {
      const timeout = setTimeout(() => {
        const track = trackRef.current;
        if (!track) return;
        track.style.transition = 'none';
        setIndex(0);
        requestAnimationFrame(() => {
          // Force layout recalc before re-enabling transition
          void track.offsetHeight;
          track.style.transition = '';
        });
      }, 650); // slightly longer than CSS transition (0.6s)
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // Append clone of first word for seamless infinite loop
  const items = [...WORDS, WORDS[0]];

  return (
    <div className={styles.container}>
      <span className={styles.scope}>@takeoff-ui</span>
      <span className={styles.slash}>/</span>
      <div className={styles.ticker}>
        <div ref={trackRef} className={styles.tickerTrack} style={{ transform: `translateY(${-index * 1.5}em)` }}>
          {items.map((word, i) => (
            <span key={i} className={styles.tickerItem}>
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
