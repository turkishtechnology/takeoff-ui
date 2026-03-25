import styles from './gif.module.css';
import React, { useEffect, useState } from 'react';

const WORDS = ['core', 'react', 'vue', 'angular'];
// Unique characters derived from the words themselves
const CHARS = 'aceglnortuv';

export default function Gif() {
  const [text, setText] = useState(WORDS[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let scrambleInterval: NodeJS.Timeout;

    const cycleInterval = setInterval(() => {
      const nextIndex = (index + 1) % WORDS.length;
      const nextWord = WORDS[nextIndex];
      let frame = 0;
      const totalFrames = 16; // Duration of the reveal effect

      scrambleInterval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;

        // Calculate how many characters to reveal from the start (Left -> Right)
        // Ensure we reveal at least 1 char eventually, but start completely scrambled
        const revealCount = Math.floor(progress * nextWord.length);

        if (frame >= totalFrames) {
          // Finish: set exact word
          setText(nextWord);
          setIndex(nextIndex);
          clearInterval(scrambleInterval);
        } else {
          // Construct string: Correct part + Scrambled part
          const revealedPart = nextWord.slice(0, revealCount);
          let scrambledPart = '';

          for (let i = revealCount; i < nextWord.length; i++) {
            scrambledPart += CHARS[Math.floor(Math.random() * CHARS.length)];
          }

          setText(revealedPart + scrambledPart);
        }
      }, 40); // Slightly faster frame rate for smoother flow
    }, 2500);

    return () => {
      clearInterval(cycleInterval);
      clearInterval(scrambleInterval);
    };
  }, [index]);
  return (
    <div className={styles.container}>
      <span className={styles.scope}>@takeoff-ui</span>
      <span className={styles.slash}>/</span>
      <span className={styles.package}>{text}</span>
    </div>
  );
}
