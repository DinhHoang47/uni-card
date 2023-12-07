"use client";
import React, { useEffect, useState } from "react";

export default function TextToSpeech({ children, text, lang }) {
  const [utterance, setUtterance] = useState();
  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    if (lang) {
      u.lang = lang;
    }
    setUtterance(u);
    return () => {
      synth.cancel();
    };
  }, [lang]);
  if (text)
    return (
      <div
        onClick={() => {
          const synth = window.speechSynthesis;
          synth.speak(utterance);
        }}
      >
        {children}
      </div>
    );
}
