"use client";

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import CollageLayout from './CollageLayout';

interface IntroSequenceProps {
    onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
    const images = ['/test.jpg', '/background.jpg'];
    const collageIndex = images.length;

    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
        exit: {
            opacity: 0,
            transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
        },
    };

    const baseDelay = 0.25;
    const cardDelay = 1.15;
    const slideDuration = 2.25;
    const finalZoomDelay = baseDelay + collageIndex * cardDelay + slideDuration + 0.45;
    const finalZoomDuration = 1.7;

    const cameraVariants: Variants = {
        hidden: {
            scale: 1.7,
            z: 460,
        },
        visible: {
            scale: 0.88,
            z: -120,
            transition: {
                duration: finalZoomDelay,
                ease: "linear",
            },
        },
    };

    const cardVariants: Variants = {
        hidden: (i: number) => {
            const direction = i % 2 === 0 ? -1 : 1;

            return {
                opacity: 0,
                scale: 0.98,
                x: direction * 360,
                y: 22,
                z: i * 70,
                rotateX: 0,
                rotateY: 0,
                rotateZ: direction * 3,
            };
        },
        visible: (i: number) => {
            const direction = i % 2 === 0 ? -1 : 1;
            const tiltAngle = i % 2 === 0 ? -(i * 3 + 3) : i * 3 + 2;
            const xOffset = (i - 1) * 28;
            const yOffset = (i - 1) * 12;
            const isCollage = i === collageIndex;

            if (isCollage) {
                return {
                    opacity: [0, 1, 1],
                    scale: [0.98, 1.02, 1.65],
                    x: [direction * 360, xOffset, 0],
                    y: [22, yOffset, 0],
                    z: [i * 70, i * 70, 180],
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: [direction * 3, tiltAngle, 0],
                    transition: {
                        duration: slideDuration + finalZoomDuration,
                        delay: baseDelay + i * cardDelay,
                        ease: "easeInOut",
                        times: [0, 0.58, 1],
                    },
                };
            }

            return {
                opacity: [0, 1],
                x: [direction * 360, xOffset],
                y: [22, yOffset],
                z: i * 70,
                scale: [0.98, 1],
                rotateX: 0,
                rotateY: 0,
                rotateZ: [direction * 3, tiltAngle],
                transition: {
                    delay: baseDelay + i * cardDelay,
                    duration: slideDuration,
                    ease: "easeInOut",
                },
            };
        },
    };

    useEffect(() => {
        const total = finalZoomDelay + finalZoomDuration - 0.25;
        const t = setTimeout(() => onComplete(), total * 1000);
        return () => clearTimeout(t);
    }, [finalZoomDelay, onComplete]);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
            style={{ perspective: 1500 }}
        >
            <motion.div
                variants={cameraVariants}
                className="relative h-[410px] w-72 sm:h-[500px] sm:w-96 md:h-[540px] md:w-[28rem]"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {[...images, 'collage'].map((src, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="absolute inset-0 h-full w-full rounded-sm bg-white p-2 shadow-[0_24px_70px_rgba(0,0,0,0.55)] sm:p-3 md:p-4"
                        style={{
                            zIndex: 10 + index,
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <div className="relative h-full w-full overflow-hidden bg-gray-200">
                            {index === collageIndex ? (
                                <CollageLayout framed />
                            ) : (
                                <Image
                                    src={src}
                                    alt={`intro-${index}`}
                                    fill
                                    priority={index === 0}
                                    sizes="(max-width: 640px) 288px, (max-width: 768px) 384px, 448px"
                                    className="object-cover"
                                />
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
