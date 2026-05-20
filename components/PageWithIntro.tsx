"use client";

import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import IntroSequence from "./IntroSequence";
import CollageLayout from "./CollageLayout";

export default function PageWithIntro() {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <div className="relative min-h-[100dvh] overflow-hidden">
            <CollageLayout />
            <AnimatePresence>
                {showIntro && (
                    <IntroSequence onComplete={() => setShowIntro(false)} />
                )}
            </AnimatePresence>
        </div>
    );
}
