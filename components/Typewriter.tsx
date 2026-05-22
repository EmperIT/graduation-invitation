"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;       // speed of typing forward (ms per char)
  deleteSpeed?: number; // speed of deleting (ms per char)
  delay?: number;       // initial delay before typing starts
  pauseDelay?: number;  // pause duration when text is fully typed
  deleteDelay?: number; // pause duration when text is fully deleted
  className?: string;
}

export default function Typewriter({
  text,
  speed = 60,
  deleteSpeed = 30,
  delay = 1200,
  pauseDelay = 2000,
  deleteDelay = 500,
  className,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing forward
      if (index < text.length) {
        // Use the initial start delay only for the first character of the typing cycle
        const currentSpeed = index === 0 ? delay : speed;
        
        timer = setTimeout(() => {
          setDisplayedText(text.slice(0, index + 1));
          setIndex((prev) => prev + 1);
        }, currentSpeed);
      } else {
        // Text is fully typed, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      }
    } else {
      // Deleting backward
      if (index > 0) {
        timer = setTimeout(() => {
          setDisplayedText(text.slice(0, index - 1));
          setIndex((prev) => prev - 1);
        }, deleteSpeed);
      } else {
        // Text is fully deleted, pause before starting the next typing cycle
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, deleteDelay);
      }
    }

    return () => clearTimeout(timer);
  }, [text, index, isDeleting, speed, deleteSpeed, delay, pauseDelay, deleteDelay]);

  return <span className={className}>{displayedText || "\u00A0"}</span>;
}
