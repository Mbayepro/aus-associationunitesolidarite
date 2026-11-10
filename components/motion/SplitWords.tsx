import React from "react";

/**
 * Typographie cinétique : chaque mot glisse depuis le bas, en cascade.
 * Animation CSS (classe `.split-word`), compatible composants serveur.
 */
export default function SplitWords({
  text,
  className = "",
  baseDelay = 0,
  step = 70,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  step?: number;
}) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="split-word">
            <span
              className={className}
              style={{ "--d": `${baseDelay + i * step}ms` } as React.CSSProperties}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </>
  );
}

