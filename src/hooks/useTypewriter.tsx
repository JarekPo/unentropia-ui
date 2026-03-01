import {useEffect, useState} from 'react';

const SPEED = 40;

export const useTypewriter = (text: string) => {
  const [displayedText, setDisplayedText] = useState<string>('');

  useEffect(() => {
    if (!text) return;

    const words = text.split(' ');
    let currentWordIndex = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        const nextWord = words[currentWordIndex];
        if (nextWord !== undefined) {
          setDisplayedText((prev) => (prev ? `${prev} ${nextWord}` : nextWord));
        }
        currentWordIndex++;
      } else {
        clearInterval(interval);
      }
    }, SPEED);

    return () => clearInterval(interval);
  }, [text]);
  return displayedText;
};
