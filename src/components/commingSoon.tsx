"use client";

import React, { useEffect, useRef } from "react";
import styles from "./commingSoon.module.css";

const PHRASES = [
    "A new era begins...",
    "We are building something huge",
    "Features you didn't expect",
    "Automation. Intelligence. Magic.",
    "Everything — reimagined.",
    "99% Complete...",
    "Launching soon...",
    "Stay tuned...",
];

const TITLE = "Excited?";
const SUBTITLE = "Coming Soon — Stay Tuned";

function useScrambleText(
    targetRef: React.RefObject<HTMLElement | null>,
    phrases: string[],
    speed = 15,        // FASTER scramble (was 30)
    pause = 800        // Slightly faster cycle
) {
    const rafRef = useRef<number | null>(null);
    const cancelled = useRef(false);

    useEffect(() => {
        if (!targetRef.current) return;
        const el = targetRef.current;
        let phraseIndex = 0;

        const chars = "!<>-_\\/[]{}—=+*^?#________".split("");

        const nextPhrase = () => {
            const text = phrases[phraseIndex];
            const start = performance.now();
            const duration = Math.min(1000, Math.max(350, text.length * 50));

            const tick = (now: number) => {
                if (cancelled.current) return;

                const progress = Math.min(1, (now - start) / duration);
                const reveal = Math.floor(progress * text.length);

                let out = "";
                for (let i = 0; i < text.length; i++) {
                    out += i < reveal ? text[i] : chars[Math.floor(Math.random() * chars.length)];
                }

                el.textContent = out;

                if (progress < 1) {
                    rafRef.current = requestAnimationFrame(tick);
                } else {
                    el.textContent = text;
                    setTimeout(() => {
                        el.classList.add("fadeOutQuick");
                        setTimeout(() => {
                            el.classList.remove("fadeOutQuick");
                            phraseIndex = (phraseIndex + 1) % phrases.length;
                            rafRef.current = requestAnimationFrame(nextPhrase);
                        }, 120);
                    }, pause);
                }
            };

            rafRef.current = requestAnimationFrame(tick);
        };

        nextPhrase();

        return () => {
            cancelled.current = true;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [phrases, speed, pause, targetRef]);
}

export default function ComingSoonCinematic() {
    const phraseRef = useRef<HTMLDivElement | null>(null);

    useScrambleText(phraseRef, PHRASES, 15, 800);

    return (
        <main className={styles.cinemaRoot}>

            <div className={styles.container}>
                <h1>Excited?</h1>
                <p className={styles.subtitle}>Stay Tuned — Coming Soon</p>

                <div ref={phraseRef} className={styles.phrase}></div>

                {/* Social Section */}
                <div className={styles.social}>
                    <p>Follow us for updates</p>

                    <div className={styles.icons}>
                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/teamtuned?igsh=MW1nYnY0eGd2eDVsMw=="
                            target="_blank"
                            className={styles.icon}
                        >
                            <img src="/icons/instagram.svg" alt="instagram" />
                        </a>

                        {/* YouTube */}
                        <a
                            href="https://www.youtube.com/@teamtunedhq"
                            target="_blank"
                            className={styles.icon}
                        >
                            <img src="/icons/youtube.svg" alt="youtube" />
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
