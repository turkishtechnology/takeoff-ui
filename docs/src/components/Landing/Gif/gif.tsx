import styles from './gif.module.css';
import React, { useEffect, useState } from 'react';

const shuffleArray = (array: string[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function Gif() {
  const words = ['core', 'react', 'vue', 'angular'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState<string[]>([]);
  const [shuffling, setShuffling] = useState(true);

  useEffect(() => {
    const word = words[currentWordIndex];
    const wordArray = word.split('');

    // İlk olarak kelimenin harflerini karışık göster
    setDisplayedWord(shuffleArray(wordArray));
    setShuffling(true);

    // Harfleri karıştırdıktan sonra düzgün sırayla göster
    const shuffleTimeout = setTimeout(() => {
      setShuffling(false);
      setDisplayedWord(wordArray); // Düzgün sıralı hali
    }, 50); // 1 saniye boyunca harfler karışık kalacak

    // 2 saniyede bir kelime değiştir
    const wordTimeout = setTimeout(() => {
      setCurrentWordIndex(prevIndex => (prevIndex + 1) % words.length);
    }, 1000);

    return () => {
      clearTimeout(shuffleTimeout);
      clearTimeout(wordTimeout);
    };
  }, [currentWordIndex]);

  return (
    <div className={styles.container}>
      <span className={styles.scope}>@takeoff-ui</span>
      <span className={styles.slash}>/</span>
      <span className={styles.package}>
        {displayedWord.map((letter, index) => (
          <span key={index} className={shuffling ? styles.shuffleLetter : styles.normalLetter}>
            {letter}
          </span>
        ))}
      </span>
    </div>
  );
}
